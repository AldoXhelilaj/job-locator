
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { act } from 'react';

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async (apiUrl, { rejectWithValue }) => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                // If the response status is not OK, reject with a specific message
                return rejectWithValue('Failed to fetch jobs: ' + response.statusText);
            }
            const data = await response.json();
            return data.data; // Assuming data.data contains the jobs
        } catch (error) {
            // Catch any network errors or other issues
            return rejectWithValue('Network error: ' + error.message);
        }
    }
);

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        selectedCityJobs: [],
        remoteOnly: false,
        allJobs: [],
        selectedCity: null,
        status: 'idle',
        error: null
    },
    reducers: {
        setSelectedCityJobs(state, action) {
            state.selectedCityJobs = action.payload;
        },
        toggleRemoteOnly(state) {
            state.remoteOnly = !state.remoteOnly;
        },
        setSelectedCitySearch(state, action) {
            state.selectedCity = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchJobs.fulfilled, (state, action) => {
            state.allJobs = action.payload;
            state.status = 'fulfilled';
        }).addCase(fetchJobs.pending, (state) => {
            state.status = 'loading';
          
        }).addCase(fetchJobs.rejected, (state) => {
            state.status = 'rejected';
            state.error = action.error.message
        })
    },
});

export const { setSelectedCityJobs, toggleRemoteOnly, setSelectedCitySearch } = jobsSlice.actions;
export const selectJobs = (state) => state.jobs.allJobs;
export const selectJobsStatus = (state) => state.jobs.status;
export const selectJobsError = (state) => state.jobs.error;

export default jobsSlice.reducer;