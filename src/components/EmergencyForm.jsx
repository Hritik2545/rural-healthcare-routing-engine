export default function EmergencyForm({
    selectedType,
    setSelectedType,
    selectedVillage,
    setSelectedVillage,
    onDispatch
}) {
    return (
        <div className="card">

            <h2>🚨 Emergency Control Center</h2>

            <h3>Select Emergency Type</h3>

            <select
                value={selectedType}
                onChange={(e) =>
                    setSelectedType(e.target.value)
                }
            >
                <option value="">
                    Choose Emergency
                </option>

                <option value="cardiology">
                    Cardiac Emergency
                </option>

                <option value="trauma">
                    Trauma Emergency
                </option>

                <option value="pediatrics">
                    Child Emergency
                </option>
            </select>

            <h3>Select Village</h3>

            <select
                value={selectedVillage}
                onChange={(e) =>
                    setSelectedVillage(e.target.value)
                }
            >
                <option value="">
                    Choose Village
                </option>

                <option value="Village A">
                    Village A
                </option>

                <option value="Village B">
                    Village B
                </option>

                <option value="Village C">
                    Village C
                </option>
            </select>

            <br />
            <br />

            <button
                onClick={() =>
                    onDispatch(selectedType, selectedVillage)
                }
            >
                Dispatch Emergency
            </button>

        </div>
    );
}