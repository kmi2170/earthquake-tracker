'use client';

import { useQuery } from 'react-query';

import { RowEqData } from '../api/types';
import { fetcher, requestUrl } from '../lib';
import { extractEqData } from '../utils/extractEqData';
import { getEndDate, getStartDate } from '../utils/getStartAndEndDate';
import { Dayjs } from 'dayjs';

const minMagnitude = 3;

export const useCustomQuery = (period: number, endDate: Dayjs) => {
  const startTime = getStartDate(period, endDate);
  const endTime = getEndDate(endDate);
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
