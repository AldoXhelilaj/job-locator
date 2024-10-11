import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../slices/jobSlice";


const SingleJob = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.jobs.allJobs);
    const [job, setJob] = useState({});
    const getJob = () => {
        return jobs.filter(job => job.slug === slug)[0]
    }

    useEffect(() => {
        const job = getJob();
        setJob(job);
    }, [jobs]);
    return (
        <div className="job-detail">
            <div className="job-header">
                <h1>{job.title}</h1>
                <h3>{job.company_name}</h3>
                <p className="location"><strong>Location:</strong> {job.location}</p>
            </div>
            <div className="description" dangerouslySetInnerHTML={{ __html: job.description }} />
        </div>
    );
}

export default SingleJob;