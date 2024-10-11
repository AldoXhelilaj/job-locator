import { useState } from 'react';
import './App.css';
import JobMap from './components/JobMap';
import { Provider } from 'react-redux';
import store from './store';
import JobResults from './components/JobResults';
import CitySearch from './components/CitySearch';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; 
import SignUp from './components/SignUp'; 
import HomePage from './components/Homepage';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';
import SingleJob from './components/SingleJob';

function App() {
  return (
    <Provider store={store}>
      <Router>
      <Navigation/>
        <Routes>
        <Route element={<PrivateRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/:slug" element={<SingleJob />} />
                </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        
      </Router>
    </Provider>
  );
}

export default App;