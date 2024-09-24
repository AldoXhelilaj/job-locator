// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobSlice';
import errorReducer from './slices/errorSlice';
import {thunk }from 'redux-thunk';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    error: errorReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;