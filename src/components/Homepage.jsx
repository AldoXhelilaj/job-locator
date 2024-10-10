import CitySearch from "./CitySearch";
import JobMap from "./JobMap";
import JobResults from "./JobResults";


const HomePage = () => {
    return (
        <div className="home-page">
            <CitySearch />
            <div className='map-grid'>
                <JobMap />
                <JobResults />
            </div>
        </div>
    );
}

export default HomePage;