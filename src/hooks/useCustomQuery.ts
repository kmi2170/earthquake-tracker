'use client';

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

const minMagnitude = 3;

export const useCustomQuery = (period: number) => {
  const { startTime } = getStartEndTimeDayjs(period);
  const url = requestUrl(startTime, minMagnitude);

  const { data, isError, error } = useQuery<RowEqData, Error>(
    ['eqData', url],
    () => fetcher(url),
    config,
  );

  // not sure if useMemo is needed here
  const eqData: DisplayEqData[] = useMemo(
    () => (data ? extractedEqData(data) : []),
    [data],
  );

  return { eqData, isError, error };
};
