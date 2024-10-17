import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  ReactNode,
} from 'react';

type InitialCenter = {
  lat: number;
  lng: number;
};

export type EqMapContextType = {
  initialCenter: InitialCenter;
  initialZoom: number;
  center: InitialCenter;
  setCenter: Dispatch<SetStateAction<InitialCenter>>;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
};

export const EqMapContext = createContext({} as EqMapContextType);

const initialCenter = { lat: 0, lng: 180 };

export const EqMapContextProvider = ({ children }: { children: ReactNode }) => {
  const initialZoom = 1.0;
  const [center, setCenter] = useState<InitialCenter>(initialCenter);
  const [zoom, setZoom] = useState<number>(initialZoom);

  const [selectedId, setSelectedId] = useState<string>('');

  const value = useMemo(
    () => ({
      initialCenter,
      initialZoom,
      center,
      setCenter,
      zoom,
      setZoom,
      selectedId,
      setSelectedId,
    }),
    [initialZoom, center, zoom, selectedId],
  );

  return (
    <EqMapContext.Provider value={value}>{children}</EqMapContext.Provider>
  );
};
