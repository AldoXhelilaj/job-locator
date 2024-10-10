import './ErrorMessage.css';

const ErrorMessage = ({ message , isSucces}) => {
    if (!message) return null;

    return (
        <div className={isSucces ? 'success-message' : 'error-message'} role="alert" aria-live="assertive">
            {message}
        </div>
    );
};

export default ErrorMessage;