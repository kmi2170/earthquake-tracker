'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Paper from '@mui/material/Paper';

import Sliders from './MapParts/Sliders';
import MapFooter from './MapFooter';
import { useMapData } from '../../context/useMapData';
import { breakpoints } from '../../constants';
import { useEqMag } from '../../context/useEqMag';
import { useDynamicMap } from '../../hooks/useMap';

const MapComponent = () => {
  const mapRef = useRef<L.Map | null>(null);

  const { initialMinMag, minMag, setMinMag, initialMaxMag, maxMag, setMaxMag } =
    useEqMag();

  const {
    initialCenter,
    initialZoom,
    setInitialZoom,
    zoom,
    setZoom,
    setSelectedId,
  } = useMapData();

  const Map = useDynamicMap();

  const [circleRadius, setCircleRadius] = useState(1);

  useEffect(() => {
    const width = window.innerWidth;
    let initZoom = 0.75;
    if (width > breakpoints.xl) {
      initZoom = 2;
    } else if (width > breakpoints.lg) {
      initZoom = 1.5;
    } else if (width > breakpoints.md) {
      initZoom = 1.5;
    } else if (width > breakpoints.sm) {
      initZoom = 1.5;
    }

    setZoom(initZoom);
    setInitialZoom(initZoom);
  }, [setZoom, setInitialZoom]);

  const resetMap = useCallback(
    (center: { lat: number; lng: number }, zoom: number) => {
      if (mapRef.current !== null) {
        mapRef.current?.flyTo(center, zoom, { duration: 1 });
      }
      setSelectedId('');
    },
    [setSelectedId],
  );

  const changeCircleRadius = useCallback(
    (value: number) => setCircleRadius(value),
    [],
  );

  const changeMinMagnitude = useCallback(
    (value: number) => setMinMag(value),
    [],
  );

  const changeMaxMagnitude = useCallback(
    (value: number) => setMaxMag(value),
    [],
  );

  if (initialZoom === null) return;

  return (
    <Paper elevation={6} sx={{ position: 'relative' }}>
      <Map ref={mapRef} circleRadius={circleRadius} />

      <Sliders
        circleRadius={circleRadius}
        changeCircleRadius={changeCircleRadius}
        initialMinMagnitude={initialMinMag}
        minMagnitude={minMag}
        changeMinMagnitude={changeMinMagnitude}
        initialMaxMagnitude={initialMaxMag}
        maxMagnitude={maxMag}
        changeMaxMagnitude={changeMaxMagnitude}
      />

      <MapFooter
        resetMap={resetMap}
        initialCenter={initialCenter}
        initialZoom={initialZoom}
      />
    </Paper>
  );
};

export default MapComponent;
