export function selectHospital(hospitals) {

    return hospitals.reduce(
        (best, current) =>
            current.distance < best.distance
                ? current
                : best
    );
}