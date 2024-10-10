import { useState } from 'react';
import cities from '../utils/de.json';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCitySearch, setSelectedCityJobs } from '../slices/jobSlice';
import './CitySearch.css';

const CitySearch = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const jobs = useSelector((state) => state.jobs.allJobs);
    const remoteOnly = useSelector((state) => state.jobs.remoteOnly);


    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filter cities based on the search term
        if (value) {
            const filtered = cities.filter(city =>
                city.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }
    };

    const handleCitySelect = (city) => {
        // Dispatch action to set selected city in Redux
        const filteredJobs = jobs.filter(job =>
            job.location === city.name && (!remoteOnly || job.remote)
        );
        console.log(filteredJobs)
        dispatch(setSelectedCityJobs(filteredJobs));
        dispatch(setSelectedCitySearch(city.name));
        setSearchTerm('');
        setFilteredCities([]);
    };

    return (
        <div className="city-search-container">
            <input
                type="text"
                placeholder="Search for a city..."
                value={searchTerm}
                onChange={handleChange}
                className="city-search-input"
            />
            {filteredCities.length > 0 && (
                <ul className="city-search-results">
                    {filteredCities.map((city) => (
                        <li key={city.name + city.state} onClick={() => handleCitySelect(city)}>
                            {city.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CitySearch;