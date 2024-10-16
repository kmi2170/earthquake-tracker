import {
  useState,
  createContext,
  ReactChild,
  Dispatch,
  SetStateAction,
  useMemo,
  ReactNode,
} from 'react';

interface InitialCenter {
  lat: number;
  lng: number;
}

export interface IEqDataContext {
  initialPeriod: number;
  initialMinMag: number;
  period: number;
  minMag: number;
  setPeriod: Dispatch<SetStateAction<number>>;
  setMinMag: Dispatch<SetStateAction<number>>;
  timeZone: string;
  setTimeZone: Dispatch<SetStateAction<string>>;
  initialCenter: InitialCenter;
  initialZoom: number;
  center: InitialCenter;
  setCenter: Dispatch<SetStateAction<InitialCenter>>;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

export const EqDataContext = createContext({} as IEqDataContext);

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

  const initialCenter = { lat: 0, lng: 180 };
  const initialZoom = 1;
  const [center, setCenter] = useState<InitialCenter>(initialCenter);
  const [zoom, setZoom] = useState<number>(initialZoom);

  const [selectedId, setSelectedId] = useState<string>('');

  /* eslint-disable react-hooks/exhaustive-deps */
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
      initialCenter,
      initialZoom,
      center,
      setCenter,
      zoom,
      setZoom,
      selectedId,
      setSelectedId,
    }),
    [period, minMag, timeZone, center, zoom, selectedId],
  );
  /* eslint-enabl react-hooks/exhaustive-deps */

  return (
    <EqDataContext.Provider value={value}>{children}</EqDataContext.Provider>
  );
};
