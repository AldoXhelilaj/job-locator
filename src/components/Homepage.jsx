import CitySearch from "./CitySearch";
import JobMap from "./JobMap";
import JobResults from "./JobResults";
import withErrorBoundary from "../hoc/withErrorBoundary";
import CrashableComponent from './CrashableComponent'

const EnhancedComponent =  withErrorBoundary(JobMap)



const HomePage = () => {
    return (
        <div className="home-page">
            <CitySearch />
            <div className='map-grid'>
                <EnhancedComponent/>
                {/* <JobMap /> */}
                <JobResults />
            </div>
        </div>
    );
}

export default HomePage;