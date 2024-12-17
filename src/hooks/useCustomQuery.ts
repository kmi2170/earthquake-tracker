'use client';

import { RowEqData } from '../api/types';
import { fetcher, requestUrl } from '../lib';
import { extractEqData } from '../utils/extractEqData';
import { Dayjs } from 'dayjs';
import { getTargetUtcDateFromLocalDayjsObjAndPeriod } from '../utils/time';
import { useQuery } from '@tanstack/react-query';

const minMagnitude = 3;

export const useCustomQuery = (period: number, endDate: Dayjs) => {
  // 2024-12-06 assumes 2024-12-06T00:00:00+00
  const startTime = getTargetUtcDateFromLocalDayjsObjAndPeriod(period, endDate);
  const endTime = getTargetUtcDateFromLocalDayjsObjAndPeriod(-1, endDate);

  const url = requestUrl(minMagnitude, startTime, endTime);

  const { data, isFetching, isError, error } = useQuery<RowEqData, Error>({
    queryKey: ['eqData', url],
    queryFn: () => fetcher(url),
    refetchInterval: 900000,
  });

  const eqData = data ? extractEqData(data) : [];

  return { eqData, isFetching, isError, error };
};
