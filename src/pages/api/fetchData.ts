import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export const fetchData = async (req: NextApiRequest, res: NextApiResponse) => {
  const url =
    'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02';
  const { data } = await axios(url);

  return res.json(data);
};
