export function selectAmbulance(ambulances) {

    return ambulances.reduce(
        (best, current) =>
            current.distance < best.distance
                ? current
                : best
    );
}