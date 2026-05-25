
export default function ErrorBanner({message, onClick, disabled}) {
    if (!message) return null;

    return (
        <div className="error-banner">
            {message}
            <button onClick={onClick} disabled={disabled}>
                Retry
            </button>
        </div>
    )
}