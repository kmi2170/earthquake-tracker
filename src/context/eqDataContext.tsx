'use client';

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
  period: number;
  minMag: number;
  setPeriod: Dispatch<SetStateAction<number>>;
  setMinMag: Dispatch<SetStateAction<number>>;
  timeZone: string;
  setTimeZone: Dispatch<SetStateAction<string>>;
};

export const EqDataContext = createContext({} as EqDataContextType);

export const EqDataContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const initialPeriod = 3;
  const initialMinMag = 4;
  const [period, setPeriod] = useState<number>(initialPeriod);
  const [minMag, setMinMag] = useState<number>(initialMinMag);

  const [timeZone, setTimeZone] = useState<string>('local');

  const value = useMemo(
    () => ({
      initialPeriod,
      initialMinMag,
      period,
      setPeriod,
      minMag,
      setMinMag,
      timeZone,
      setTimeZone,
    }),
    [period, minMag, timeZone],
  );

  return (
    <EqDataContext.Provider value={value}>{children}</EqDataContext.Provider>
  );
};
