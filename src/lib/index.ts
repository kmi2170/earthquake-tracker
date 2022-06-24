import axios from 'axios';
import { RowEqData } from '../api/types';

export const fetcher = async (url: string) => {
  try {
    // const { data } = await axios.get<RowEqData[]>(url);
    const { data } = await axios.get<RowEqData>(url);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const requestUrl = (startTime: string, minMag: number) =>
  `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&minmagnitude=${minMag}`;
