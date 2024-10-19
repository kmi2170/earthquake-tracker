import { DisplayEqData, RowEqData } from '../api/types';

export const extractEqData = (data: RowEqData): DisplayEqData[] => {
  return data?.features.map(({ id, properties, geometry }) => {
    const { mag, place, time, updated, tz, alert, tsunami, detail } =
      properties;

    return {
      id,
      mag,
      place,
      time,
      updated,
      tz,
      alert,
      tsunami,
      detail,
      coordinates: geometry.coordinates,
    };
  });
};
