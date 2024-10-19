'use client';

import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { DisplayEqData, RowEqData } from '../api/types';
import { fetcher, requestUrl } from '../lib';
import { extractedEqData } from '../utils/extractEqData';
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
      refetchInterval: 1800000,
      onSuccess: () => {
        console.log('Success data fetching');
      },
    },
  );

  // not sure if useMemo is needed here
  const eqData: DisplayEqData[] = useMemo(
    () => (data ? extractedEqData(data) : []),
    [data],
  );

  return { eqData, isFetching, isError, error };
};
