import { useState } from 'react'
import './App.css'
import JobMap from './components/JobMap'
import { Provider } from 'react-redux'
import store from './store'
import JobResults from './components/JobResults'
import CitySearch from './components/CitySearch'

function App() {


  return (
    <Provider store={store}>
      <CitySearch />
      <div className='map-grid'>
        <JobMap />
        <JobResults />
      </div>

    </Provider>
  )
}

export default App
