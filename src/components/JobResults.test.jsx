// src/components/JobResults.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import JobResults from './JobResults';

const mockStore = configureStore([]);

describe('JobResults Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      jobs: {
        selectedCityJobs: [],
        remoteOnly: false,
        selectedCity: null,
      },
      error: {
        message: '',
      },
    });
  });

  test('renders message when no city is selected', () => {
    render(
      <Provider store={store}>
        <JobResults />
      </Provider>
    );
    screen.debug(); 
    expect(screen.getByText(/Please select a city/i)).toBeInTheDocument();
  });

  test('renders error message when there is an error', () => {
    store = mockStore({
      jobs: {
        selectedCityJobs: [],
        remoteOnly: false,
        selectedCity: 'Berlin',
      },
      error: {
        message: 'Network error',
      },
    });

    render(
      <Provider store={store}>
        <JobResults />
      </Provider>
    );

    expect(screen.getByText(/Network error/i)).toBeInTheDocument();
  });

  test('renders no jobs available message when no jobs are found', () => {
    store = mockStore({
      jobs: {
        selectedCityJobs: [],
        remoteOnly: false,
        selectedCity: 'Berlin',
      },
      error: {
        message: '',
      },
    });

    render(
      <Provider store={store}>
        <JobResults />
      </Provider>
    );

    expect(screen.getByText(/No jobs available for Berlin/i)).toBeInTheDocument();
  });

  test('renders job cards when jobs are available', () => {
    const jobs = [
      {
        slug: 'dutch-or-french-fast-paced-customer-service-role-munster-130240',
        company_name: 'Workstation Customer Care',
        title: 'Dutch or French Fast paced customer service role (m/f/d)',
        remote: false,
        url: 'https://www.arbeitnow.com/jobs/companies/workstation-customer-care/dutch-or-french-fast-paced-customer-service-role-munster-130240',
        location: 'Münster',
      },
      {
        slug: 'associate-brand-partnership-join-prime-agency-media-group-us-expansion-berlin-321214',
        company_name: 'PRIME AGENCY MEDIA GROUP GmbH',
        title: 'Associate - Brand Partnership - Join Prime Agency Media Group US Expansion',
        remote: true,
        url: 'https://www.arbeitnow.com/jobs/companies/prime-agency-media-group-gmbh/associate-brand-partnership-join-prime-agency-media-group-us-expansion-berlin-321214',
        location: 'Berlin',
      }
    ];

    store = mockStore({
      jobs: {
        selectedCityJobs: jobs,
        remoteOnly: false,
        selectedCity: 'Berlin',
      },
      error: {
        message: '',
      },
    });

    render(
      <Provider store={store}>
        <JobResults />
      </Provider>
    );

    // Check if both job titles are rendered
    expect(screen.getByText(/Dutch or French Fast paced customer service role/i)).toBeInTheDocument();
    expect(screen.getByText(/Associate - Brand Partnership - Join Prime Agency Media Group US Expansion/i)).toBeInTheDocument();
  });
});