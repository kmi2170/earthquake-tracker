export const normalizeLng = (lng: number) => (lng < 0.0 ? lng + 360 : lng);
