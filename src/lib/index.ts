import axios from 'axios';
import { RowEqData } from '../api/types';

export const fetcher = async (url: string) => {
  const { data } = await axios.get<RowEqData>(url);

  return data;
};

export const requestUrl = (
  minMag: number,
  startTime: string,
  endTime: string,
) =>
  `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minmagnitude=${minMag}`;
