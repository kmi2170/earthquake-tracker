import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { DisplayEqData, RowEqData } from '../api/types';
import { fetcher, requestUrl } from '../lib';
import { extractedEqData } from '../utils/extractEqData';
import { getStartEndTimeDayjs } from '../utils/getStartEndTimeDayjs';

export const config = {
  refetchInterval: 300000,
  onSuccess: () => {
    console.log('Success data fetching');
  },
};

export const useCustomQuery = (period: number, minMag: number) => {
  const { startTime } = getStartEndTimeDayjs(period);
  const url = requestUrl(startTime, minMag);

  const { data, isError, error } = useQuery<RowEqData, Error>(
    ['eqData', url],
    () => fetcher(url),
    config
  );

  const eqData: DisplayEqData[] = useMemo(
    () => extractedEqData(data) || [],
    [data]
  );

  return { eqData, isError, error };
};
