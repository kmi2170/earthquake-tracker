'use client';

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
  initialZoom: number | null;
  setInitialZoom: Dispatch<SetStateAction<number | null>>;
  center: InitialCenter;
  setCenter: Dispatch<SetStateAction<InitialCenter>>;
  zoom: number | null;
  setZoom: Dispatch<SetStateAction<number | null>>;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
};

export const EqMapContext = createContext({} as EqMapContextType);

const initialCenter = { lat: 0, lng: 180 };

export const EqMapContextProvider = ({ children }: { children: ReactNode }) => {
  const [center, setCenter] = useState<InitialCenter>(initialCenter);
  const [initialZoom, setInitialZoom] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number | null>(initialZoom);
  const [selectedId, setSelectedId] = useState<string>('');

  const value = useMemo(
    () => ({
      initialCenter,
      initialZoom,
      setInitialZoom,
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
