import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Map, { Marker, Popup, GeolocateControl, FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl';
import { setSelectedCityJobs, toggleRemoteOnly, fetchJobs, setSelectedCitySearch } from '../slices/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import cities from '../utils/de.json';
import CustomCheckbox from './CustomCheckbox';
import useNetworkStatus from '../hooks/useNetworkStatus';
import { setError, clearError } from '../slices/errorSlice';
import { selectJobs, selectJobsError, selectJobsStatus } from '../slices/jobSlice';
import ErrorMessage from './ErrorMessage';

const JobMap = React.memo(() => {
    const [viewport, setViewport] = useState({
        latitude: 51.1657,
        longitude: 10.4515,
        zoom: 5,
        width: '100%',
        height: '90vh',
        bearing: 0,
        pitch: 0
    });


    const dispatch = useDispatch();
    const isOnline = useNetworkStatus();
    const errorMessage = useSelector((state) => state.error.message);
    const selectedCitySearch = useSelector((state) => state.jobs.selectedCity);
    const remoteOnly = useSelector((state) => state.jobs.remoteOnly);
    const jobs = useSelector((state) => state.jobs.allJobs);

    // const jobs = useSelector(selectJobs);
    const status = useSelector(selectJobsStatus);
    const error = useSelector(selectJobsError);

    // Fetch job data from API
    useEffect(() => {
        if (isOnline) {
            dispatch(fetchJobs(import.meta.env.VITE_API_URL)).catch(() => {
                dispatch(setError('Unable to fetch job listings. Please try again later.'));


            });
        } else {
            dispatch(setError('You are currently offline. Please check your internet connection.'));
        }
        return () => {
            dispatch(clearError());
        }
    }, [dispatch, isOnline]);

    // Function to filter jobs by city
    const filterJobs = useCallback((city) => {
        const filteredJobs = jobs.filter(job =>
            job.location === city.name && (!remoteOnly || job.remote)
        );
        dispatch(setSelectedCityJobs(filteredJobs));
        dispatch(setSelectedCitySearch(city.name));
    }, []);


    const filteredJobs = useMemo(() => {
        return jobs.filter(job => job.location === selectedCitySearch && (!remoteOnly || job.remote));
    }, [jobs, selectedCitySearch, remoteOnly]);

    useEffect(() => {
        if (selectedCitySearch) {

            dispatch(setSelectedCityJobs(filteredJobs));
        }


    }, [selectedCitySearch, jobs, remoteOnly, dispatch, status]);

    const jobCounts = useMemo(() => {
        return cities.reduce((accumulator, city) => {
            const count = jobs.filter(job =>
                job.location === city.name && (!remoteOnly || job.remote)
            ).length;
            accumulator[city.name] = count;
            return accumulator;
        }, {});
    }, [remoteOnly, jobs, cities]);
    if (status === 'loading') {
        return <div>Loading...</div>;
    }


    return (
        <div className='map'>
            <CustomCheckbox
                checked={remoteOnly}
                onChange={() => dispatch(toggleRemoteOnly())}
                label="Show remote jobs only"
            />
            <Map
                mapboxAccessToken={import.meta.env.VITE_ACCESS_TOKEN}
                initialViewState={viewport}
                style={{ width: '100%', height: '90vh' }}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                enableScrollZoom={true}
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />
                {/* Render markers for each city with available jobs */}

                {cities.map(city => {
                    const jobCount = jobCounts[city.name] || 0;
                    if (jobCount === 0) return null
                    return (
                        <Marker key={city.coords.lat} longitude={city.coords.lon} latitude={city.coords.lat}>
                            <div onClick={() => filterJobs(city)} style={{
                                backgroundColor: selectedCitySearch === city.name ? '#6a0dad' : '#75677f',
                                borderRadius: '50%', padding: '5px', color: 'white', cursor: 'pointer', width: '25px', height: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}>
                                {jobCount}
                            </div>
                        </Marker>
                    );
                })}
            </Map>
        </div>
    );
});

export default JobMap;