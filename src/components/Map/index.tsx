'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';

import GetCenterZoom from './MapParts/GetCenterZoom';
import ShowCirclesOnMap from './MapParts/ShowCirclesOnMap';
import MapFooter from './MapFooter';
import { normalizeLng } from '../../utils/normalizeLng';
import { useCustomQuery } from '../../hooks/useCustomQuery';
import Sliders from './MapParts/Sliders';
import { useEqData } from '../../context/useEqData';
import { useMapData } from '../../context/useMapData';
import { Theme } from '@mui/material';
import { breakpoints } from '../../constants';
import LoadingSpinner from './MapParts/LoadingSpinner';

const useStyles = makeStyles((theme: Theme) => ({
  map: {
    width: '100%',
    height: '50vh',
    padding: 0,
    margin: 0,
  },
  // [theme.breakpoints.down('md')]: {
  //   map: {
  //     height: '50vh',
  //   },
  // },
}));

const MapComponent = () => {
  const classes = useStyles();
  const mapRef = useRef(null);

  const { period, minMag, setMinMag, timeZone } = useEqData();
  const {
    initialCenter,
    center,
    setCenter,
    initialZoom,
    setInitialZoom,
    zoom,
    setZoom,
    selectedId,
    setSelectedId,
  } = useMapData();

  const { eqData, isFetching, isError, error } = useCustomQuery(period);
  const filteredEqData = eqData
    .filter((data) => data.mag >= minMag)
    .sort((a, b) => a.mag - b.mag);

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
        (mapRef.current as Map)?.flyTo(center, zoom, { duration: 1 });
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

  useEffect(() => {
    if (selectedId) {
      const moveToEpicenter = (selectedId: string) => {
        const selectedEqData = filteredEqData.filter(
          (data) => selectedId === data.id,
        );
        const lat = selectedEqData[0]?.coordinates[1];
        const lng = normalizeLng(selectedEqData[0]?.coordinates[0]);

        if (mapRef.current !== null) {
          (mapRef.current as Map)?.flyTo({ lat, lng }, 5, {
            duration: 2,
          });
        }
      };

      moveToEpicenter(selectedId);
    }
  }, [selectedId]);

  if (isError) return <div>Error: {error?.message}</div>;

  if (initialZoom === null || zoom === null) return;

  return (
    <Paper elevation={6} sx={{ position: 'relative' }}>
      <MapContainer
        className={classes.map}
        ref={mapRef}
        center={center}
        zoom={zoom}
        zoomSnap={0.25}
        scrollWheelZoom={true}
      >
        {isFetching && <LoadingSpinner />}

        <GetCenterZoom setCenter={setCenter} setZoom={setZoom} />

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ShowCirclesOnMap
          eqData={filteredEqData}
          timeZone={timeZone}
          selectedId={selectedId}
          zoom={zoom}
          circleRadius={circleRadius}
        />
      </MapContainer>

      <Sliders
        circleRadius={circleRadius}
        changeCircleRadius={changeCircleRadius}
        minMagnitude={minMag}
        changeMinMagnitude={changeMinMagnitude}
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

// const LoadingSpinner = () => {
//   return (
//     <Box
//       sx={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         zIndex: 1000,
//       }}
//     >
//       <CircularProgress
//         color="secondary"
//         size={100}
//         thickness={8}
//         sx={{ fontSize: '8rem' }}
//       />
//     </Box>
//   );
// };
