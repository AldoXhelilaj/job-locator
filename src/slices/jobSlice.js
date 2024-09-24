
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (apiUrl) => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.data;
});

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        selectedCityJobs: [],
        remoteOnly: false,
        allJobs: [],
        selectedCity: null
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
        });
    },
});

export const { setSelectedCityJobs, toggleRemoteOnly,  setSelectedCitySearch} = jobsSlice.actions;
export default jobsSlice.reducer;