'use client';

import { useQuery } from 'react-query';

import { RowEqData } from '../api/types';
import { fetcher, requestUrl } from '../lib';
import { extractEqData } from '../utils/extractEqData';
import { Dayjs } from 'dayjs';
import {
  getTargetUtcDateFromLocalDayjsObjAndPeriod,
  getUtcDateFromLocalDayjsObj,
} from '../utils/time';

const minMagnitude = 3;

export const useCustomQuery = (period: number, endDate: Dayjs) => {
  const startTime = getTargetUtcDateFromLocalDayjsObjAndPeriod(period, endDate);
  const endTime = getUtcDateFromLocalDayjsObj(endDate);
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
