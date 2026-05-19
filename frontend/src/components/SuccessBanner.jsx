
export default function SuccessBanner({message}) {
    if (!message) return null;

    return (
        <div className="success-banner">
            {message}
        </div>
    )
}