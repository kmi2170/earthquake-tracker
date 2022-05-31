import {
  useState,
  createContext,
  ReactChild,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';

interface InitialCener {
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
  initialCener: InitialCener;
  initialZoom: number;
  center: InitialCener;
  setCenter: Dispatch<SetStateAction<InitialCener>>;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

export const EqDataContext = createContext({} as IEqDataContext);

export const EqDataContextProvider = ({
  children,
}: {
  children: ReactChild;
}) => {
  const initialPeriod = 3;
  const initialMinMag = 4;
  const [period, setPeriod] = useState<number>(initialPeriod);
  const [minMag, setMinMag] = useState<number>(initialMinMag);

  const [timeZone, setTimeZone] = useState<string>('local');

  const initialCener = { lat: 0, lng: 180 };
  const initialZoom = 1;
  const [center, setCenter] = useState<InitialCener>(initialCener);
  const [zoom, setZoom] = useState<number>(initialZoom);

  const [selectedId, setSelectedId] = useState<string>('');

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
      initialCener,
      initialZoom,
      center,
      setCenter,
      zoom,
      setZoom,
      selectedId,
      setSelectedId,
    }),
    [period, minMag, timeZone, center, zoom, selectedId]
  );

  return (
    <EqDataContext.Provider value={value}>{children}</EqDataContext.Provider>
  );
};
