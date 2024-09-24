import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="error-message" role="alert" aria-live="assertive">
            {message}
        </div>
    );
};

export default ErrorMessage;