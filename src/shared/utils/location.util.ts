const EARTH_RADIUS_IN_METERS = 6371000;
const DEFAULT_ATTENDANCE_RADIUS_IN_METERS = 50;

export function getDistanceInMeters(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
): number {
    const toRad = (deg: number) => deg * (Math.PI / 180);

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.pow(Math.sin(dLon / 2), 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_IN_METERS * c;
}

export function isWithinAttendanceRadius(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    radiusInMeters: number = DEFAULT_ATTENDANCE_RADIUS_IN_METERS,
): boolean {
    return getDistanceInMeters(lat1, lon1, lat2, lon2) <= radiusInMeters;
}
