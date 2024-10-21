'use client';

import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  ReactNode,
} from 'react';

export type EqMagContextType = {
  initialMinMag: number;
  initialMaxMag: number;
  minMag: number;
  setMinMag: Dispatch<SetStateAction<number>>;
  maxMag: number;
  setMaxMag: Dispatch<SetStateAction<number>>;
};

export const EqMagContext = createContext({} as EqMagContextType);

export const EqMagContextProvider = ({ children }: { children: ReactNode }) => {
  const initialMinMag = 3;
  const initialMaxMag = 8;
  const [minMag, setMinMag] = useState<number>(initialMinMag);
  const [maxMag, setMaxMag] = useState<number>(initialMaxMag);

  const value = useMemo(
    () => ({
      initialMinMag,
      initialMaxMag,
      minMag,
      setMinMag,
      maxMag,
      setMaxMag,
    }),
    [minMag, maxMag],
  );

  return (
    <EqMagContext.Provider value={value}>{children}</EqMagContext.Provider>
  );
};
