/**
 * Checks if the distance between two points is within 50 kilometers.
 */


export function isWithin50Km(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): boolean {
    const R = 6371; // Earth radius in km

    const toRad = (deg: number) => deg * (Math.PI / 180);

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.pow(Math.sin(dLon / 2), 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance <= 50;

}
