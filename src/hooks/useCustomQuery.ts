'use client';

import { useQuery } from 'react-query';

import { RowEqData } from '../api/types';
import { fetcher, requestUrl } from '../lib';
import { extractEqData } from '../utils/extractEqData';
import { Dayjs } from 'dayjs';
import { getTargetUtcDateFromLocalDayjsObjAndPeriod } from '../utils/time';

const minMagnitude = 3;

export const useCustomQuery = (period: number, endDate: Dayjs) => {
  // 2024-12-06 assumes 2024-12-06T00:00:00+00
  const startTime = getTargetUtcDateFromLocalDayjsObjAndPeriod(period, endDate);
  const endTime = getTargetUtcDateFromLocalDayjsObjAndPeriod(-1, endDate);

  const url = requestUrl(minMagnitude, startTime, endTime);

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
