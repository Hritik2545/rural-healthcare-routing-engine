import { hospitals } from "../data/hospitals";
import { ambulances } from "../data/ambulances";

import { selectHospital } from "./hospitalSelector";
import { selectAmbulance } from "./ambulanceSelector";

export function dispatchEmergency(type, village) {
    let eligibleHospitals = [];
    let medicineQueue = [];

    switch (type) {
        case "cardiology":
            eligibleHospitals = hospitals.filter(
                (hospital) =>
                    hospital.cardiologist &&
                    hospital.beds > 0
            );

            medicineQueue = [
                "Aspirin",
                "Nitroglycerin",
                "Oxygen Cylinder",
                "ECG Kit",
            ];
            break;

        case "trauma":
            eligibleHospitals = hospitals.filter(
                (hospital) =>
                    hospital.traumaCare &&
                    hospital.beds > 0
            );

            medicineQueue = [
                "Blood Units",
                "Painkillers",
                "Bandages",
                "IV Fluids",
            ];
            break;

        case "pediatrics":
            eligibleHospitals = hospitals.filter(
                (hospital) =>
                    hospital.pediatrician &&
                    hospital.beds > 0
            );

            medicineQueue = [
                "ORS",
                "Paracetamol",
                "Pediatric Syrup",
                "Pediatric IV Kit",
            ];
            break;

        default:
            eligibleHospitals = hospitals.filter(
                (hospital) => hospital.beds > 0
            );

            medicineQueue = [
                "General Medical Kit",
            ];
    }

    if (eligibleHospitals.length === 0) {
        return {
            error:
                "No suitable hospital available.",
        };
    }

    const selectedHospital =
        selectHospital(eligibleHospitals);

    const availableAmbulances =
        ambulances.filter(
            (ambulance) => ambulance.available
        );

    const selectedAmbulance =
        selectAmbulance(
            availableAmbulances
        );

    const travelCost =
        selectedHospital.distance;

    const waitCost =
        Math.floor(Math.random() * 8) + 2;

    const medicineCost =
        medicineQueue.length;

    const totalCost =
        travelCost +
        waitCost +
        medicineCost;

    const trackingId =
        "TRACK-" +
        Math.floor(
            1000 + Math.random() * 9000
        );

    const eta =
        Math.max(
            3,
            Math.floor(
                selectedHospital.distance / 5
            )
        ) + " mins";

    const progress =
        Math.floor(
            Math.random() * 40 + 60
        );

    const decisionLog = [
        "Emergency Request Received",
        `Emergency Type: ${type}`,
        `Source Village: ${village}`,
        `${eligibleHospitals.length} hospitals evaluated`,
        `Selected Hospital: ${selectedHospital.name}`,
        `Selected Ambulance: ${selectedAmbulance.id}`,
        "Medicine Queue Prepared",
        `Travel Cost: ${travelCost}`,
        `Wait Cost: ${waitCost}`,
        `Medicine Cost: ${medicineCost}`,
        `Total Cost: ${totalCost}`,
        "Dispatch Approved",
    ];

    return {
        type,
        village,

        hospital: selectedHospital,
        ambulance: selectedAmbulance,

        medicineQueue,

        travelCost,
        waitCost,
        medicineCost,
        totalCost,

        trackingId,
        eta,
        progress,

        decisionLog,
    };
}