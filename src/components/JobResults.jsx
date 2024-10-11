import React from 'react';
import { useSelector } from 'react-redux';
import './JobResults.css';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';

const JobResults = () => {
  const selectedCityJobs = useSelector((state) => state.jobs.selectedCityJobs);
  const remoteOnly = useSelector((state) => state.jobs.remoteOnly);
  const selectedCity = useSelector((state) => state.jobs.selectedCity);
  const errorMessage = useSelector((state) => state.error.message);

  // Filter jobs based on the remoteOnly state
  const filteredJobs = remoteOnly 
    ? selectedCityJobs.filter(job => job.remote) 
    : selectedCityJobs;

  return (
    <div className="job-results">
      {errorMessage ? (
        <h2><ErrorMessage message={errorMessage} /></h2>
      ) : (
        selectedCity ? (
          filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <Link to={`${job.slug}`} key={job.slug}>
              <div className="job-card" key={job.slug}>
                <h3>{job.title}</h3>
                <p>{job.company_name}</p>
                <p>Remote: {job.remote ? 'Yes' : 'No'}</p>
                <p>Location: {job.location}</p>
              </div>
              </Link>
            ))
          ) : (
            <h2>No jobs available for {selectedCity}.</h2>
          )
        ) : (
          <h2>Please select a city</h2>
        )
      )}
    </div>
  );
};

export default JobResults;