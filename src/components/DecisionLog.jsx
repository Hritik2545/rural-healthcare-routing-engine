export default function DecisionLog({ result }) {

    if (!result) {
        return (
            <div className="card">
                <h2>📝 Decision Log</h2>
                <p>No emergency dispatched yet.</p>
            </div>
        );
    }

    return (
        <div className="card">

            <h2>📝 Decision Log</h2>

            <p>
                <strong>Emergency Type:</strong> {result.type}
            </p>

            <p>
                <strong>Village:</strong> {result.village}
            </p>

            <hr />

            <p>
                <strong>🏥 Hospital Selected:</strong>
            </p>

            <p>{result.hospital.name}</p>

            <p>
                Distance: {result.hospital.distance} km
            </p>

            <hr />

            <p>
                <strong>🚑 Ambulance Assigned:</strong>
            </p>

            <p>{result.ambulance.id}</p>

            <hr />

            <h3>💊 Medicine Queue</h3>

            <ul>
                {result.medicineQueue.map((medicine, index) => (
                    <li key={index}>{medicine}</li>
                ))}
            </ul>

            <hr />

            <h3>💰 Cost Breakdown</h3>

            <p>Travel Cost: {result.travelCost}</p>

            <p>Wait Cost: {result.waitCost}</p>

            <p>Medicine Cost: {result.medicineCost}</p>

            <h4>
                Total Cost: {result.totalCost}
            </h4>

            <hr />

            <h3>📋 Decision Path</h3>

            <ul>
                {result.decisionLog.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>

        </div>
    );
}