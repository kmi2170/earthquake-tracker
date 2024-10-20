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
  initialMaxMag: number;
  endDate: Dayjs;
  setEndDate: Dispatch<SetStateAction<Dayjs>>;
  period: number;
  setPeriod: Dispatch<SetStateAction<number>>;
  minMag: number;
  setMinMag: Dispatch<SetStateAction<number>>;
  maxMag: number;
  setMaxMag: Dispatch<SetStateAction<number>>;
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
  const initialMinMag = 3;
  const initialMaxMag = 8;
  const initialEndDate = dayjs(new Date());
  const [endDate, setEndDate] = useState(initialEndDate);
  const [period, setPeriod] = useState<number>(initialPeriod);
  const [minMag, setMinMag] = useState<number>(initialMinMag);
  const [maxMag, setMaxMag] = useState<number>(initialMaxMag);

  const [timeZone, setTimeZone] = useState<TimeZone>('local');

  const value = useMemo(
    () => ({
      initialPeriod,
      initialMinMag,
      initialMaxMag,
      endDate,
      setEndDate,
      period,
      setPeriod,
      minMag,
      setMinMag,
      maxMag,
      setMaxMag,
      timeZone,
      setTimeZone,
    }),
    [endDate, period, minMag, maxMag, timeZone],
  );

  return (
    <EqDataContext.Provider value={value}>{children}</EqDataContext.Provider>
  );
};
