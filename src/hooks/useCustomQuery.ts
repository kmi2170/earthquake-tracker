'use client';

import { useQuery } from 'react-query';

import { RowEqData } from '../api/types';
import { fetcher, requestUrl } from '../lib';
import { extractEqData } from '../utils/extractEqData';
import { getStartEndTimeDayjs } from '../utils/getStartEndTimeDayjs';

const minMagnitude = 3;

export const useCustomQuery = (period: number) => {
  const { startTime } = getStartEndTimeDayjs(period);
  const url = requestUrl(startTime, minMagnitude);

  const { data, isFetching, isError, error } = useQuery<RowEqData, Error>(
    ['eqData', url],
    () => fetcher(url),
    {
      keepPreviousData: true,
      refetchInterval: 900000,
      onSuccess: () => {
        console.log('Success data fetching');
      },
    },
  );

  const eqData = data ? extractEqData(data) : [];

  return { eqData, isFetching, isError, error };
};
