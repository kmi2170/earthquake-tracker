'use client';

import { useEffect, useCallback, useState } from 'react';

import Paper from '@mui/material/Paper';

import Sliders from './MapParts/Sliders';
import MapFooter from './MapFooter';
import { useMapData } from '../../context/useMapData';
import { breakpoints } from '../../constants';
import { useEqMag } from '../../context/useEqMag';
import { useDynamicMap } from '../../hooks/useMap';

const MapComponent = () => {
  const { initialMinMag, minMag, setMinMag, initialMaxMag, maxMag, setMaxMag } =
    useEqMag();
  const { initialCenter, initialZoom, setInitialZoom, setZoom } = useMapData();

  const Map = useDynamicMap();

  const [circleRadius, setCircleRadius] = useState(1);
  const [reset, setReset] = useState(false);

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
      <Map circleRadius={circleRadius} reset={reset} setReset={setReset} />

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
        initialCenter={initialCenter}
        initialZoom={initialZoom}
        setReset={setReset}
      />
    </Paper>
  );
};

export default MapComponent;
