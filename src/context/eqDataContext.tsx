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

export type EqDataContextType = {
  initialPeriod: number;
  initialMinMag: number;
  endDate: Dayjs;
  setEndDate: Dispatch<SetStateAction<Dayjs>>;
  period: number;
  setPeriod: Dispatch<SetStateAction<number>>;
  minMag: number;
  setMinMag: Dispatch<SetStateAction<number>>;
  timeZone: TimeZone;
  setTimeZone: Dispatch<SetStateAction<TimeZone>>;
};

export type TimeZone = 'local' | 'utc';

export const EqDataContext = createContext({} as EqDataContextType);

export const EqDataContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const initialPeriod = 7;
  const initialMinMag = 4;
  const initialEndDate = dayjs(new Date());
  const [endDate, setEndDate] = useState(initialEndDate);
  const [period, setPeriod] = useState<number>(initialPeriod);
  const [minMag, setMinMag] = useState<number>(initialMinMag);

  const [timeZone, setTimeZone] = useState<TimeZone>('local');

  const value = useMemo(
    () => ({
      initialPeriod,
      initialMinMag,
      endDate,
      setEndDate,
      period,
      setPeriod,
      minMag,
      setMinMag,
      timeZone,
      setTimeZone,
    }),
    [endDate, period, minMag, timeZone],
  );

  return (
    <EqDataContext.Provider value={value}>{children}</EqDataContext.Provider>
  );
};
