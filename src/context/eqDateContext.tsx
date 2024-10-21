'use client';

import dayjs, { Dayjs } from 'dayjs';
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  ReactNode,
} from 'react';

export type EqDateContextType = {
  initialPeriod: number;
  endDate: Dayjs;
  setEndDate: Dispatch<SetStateAction<Dayjs>>;
  period: number;
  setPeriod: Dispatch<SetStateAction<number>>;
  timeZone: TimeZone;
  setTimeZone: Dispatch<SetStateAction<TimeZone>>;
};

export type TimeZone = 'local' | 'utc';

export const EqDateContext = createContext({} as EqDateContextType);

export const EqDateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const initialPeriod = 7;
  const initialEndDate = dayjs(new Date());
  const [endDate, setEndDate] = useState(initialEndDate);
  const [period, setPeriod] = useState<number>(initialPeriod);

  const [timeZone, setTimeZone] = useState<TimeZone>('local');

  const value = useMemo(
    () => ({
      initialPeriod,
      endDate,
      setEndDate,
      period,
      setPeriod,
      timeZone,
      setTimeZone,
    }),
    [endDate, period, timeZone],
  );

  return (
    <EqDateContext.Provider value={value}>{children}</EqDateContext.Provider>
  );
};
