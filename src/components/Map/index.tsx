'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import Paper from '@mui/material/Paper';

import Sliders from './MapParts/Sliders';
import MapMain from './MapMain';
import MapFooter from './MapFooter';
// import LoadingSpinner from './MapParts/LoadingSpinner';
import { useCustomQuery } from '../../hooks/useCustomQuery';
import { useMapData } from '../../context/useMapData';
import { breakpoints } from '../../constants';
import { useEqDate } from '../../context/useEqDate';
import { useEqMag } from '../../context/useEqMag';

const MapComponent = () => {
  const mapRef = useRef<L.Map | null>(null);

  const { initialMinMag, minMag, setMinMag, initialMaxMag, maxMag, setMaxMag } =
    useEqMag();

  // const { endDate, period } = useEqDate();

  const {
    initialCenter,
    initialZoom,
    setInitialZoom,
    zoom,
    setZoom,
    setSelectedId,
  } = useMapData();

  // const { eqData } = useCustomQuery(period, endDate);
  // const filteredEqData = eqData
  //   .filter((data) => data.mag >= minMag)
  //   .filter((data) => data.mag <= (maxMag === 8 ? 100 : maxMag))
  //   .sort((a, b) => a.mag - b.mag);

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

  // useEffect(() => {
  //   if (selectedId) {
  //     const moveToEpicenter = (selectedId: string) => {
  //       const selectedEqData = filteredEqData.filter(
  //         (data) => selectedId === data.id,
  //       );
  //       const lat = selectedEqData[0]?.coordinates[1];
  //       const lng = normalizeLng(selectedEqData[0]?.coordinates[0]);

  //       if (mapRef.current !== null) {
  //         (mapRef.current as Map)?.flyTo({ lat, lng }, 5, {
  //           duration: 2,
  //         });
  //       }
  //     };

  //     moveToEpicenter(selectedId);
  //   }
  // }, [selectedId]);

  // if (isError) {
  //   return <ErrorMessage error={error as AxiosError} />;
  // }

  if (initialZoom === null || zoom === null) return;

  return (
    <Paper elevation={6} sx={{ position: 'relative' }}>
      {/* <MapContainer
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
      </MapContainer> */}
      <MapMain ref={mapRef} circleRadius={circleRadius} />

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

// type ErrorMessageProps = {
//   error: AxiosError;
// };

// const ErrorMessage = ({ error }: ErrorMessageProps) => {
//   let message;

//   if (
//     error.response?.data &&
//     (error.response.data as string).includes(
//       'matching events exceeds search limit of',
//     )
//   ) {
//     const str = error.response.data as string;
//     const lines = str.split(/\n\s*\n/);
//     message = lines[1];
//   } else {
//     message = error.message;
//   }

//   return (
//     <div
//       style={{
//         width: '100%',
//         height: '66vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Typography sx={{ fontSize: '1.5rem' }}>Error: {message}</Typography>
//     </div>
//   );
// };

// type MapMainProps = {
//   circleRadius: number;
// };

// const MapMain = forwardRef<Map, MapMainProps>(function MapMain(params, ref) {
//   const { circleRadius } = params;

//   const classes = useStyles();

//   const { initialMinMag, minMag, setMinMag, initialMaxMag, maxMag, setMaxMag } =
//     useEqMag();

//   const {
//     initialCenter,
//     center,
//     setCenter,
//     initialZoom,
//     setInitialZoom,
//     zoom,
//     setZoom,
//     selectedId,
//     setSelectedId,
//   } = useMapData();

//   const { endDate, period, timeZone } = useEqDate();

//   const { eqData, isFetching, isError, error } = useCustomQuery(
//     period,
//     endDate,
//   );

//   const filteredEqData = eqData
//     .filter((data) => data.mag >= minMag)
//     .filter((data) => data.mag <= (maxMag === 8 ? 100 : maxMag))
//     .sort((a, b) => a.mag - b.mag);

//   if (initialZoom === null || zoom === null) return;

//   return (
//     <MapContainer
//       className={classes.map}
//       ref={ref}
//       center={center}
//       zoom={zoom}
//       zoomSnap={0.25}
//       scrollWheelZoom={true}
//     >
//       {/* {isFetching && <LoadingSpinner />} */}

//       <GetCenterZoom setCenter={setCenter} setZoom={setZoom} />

//       <TileLayer
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       <ShowCirclesOnMap
//         eqData={filteredEqData}
//         timeZone={timeZone}
//         selectedId={selectedId}
//         zoom={zoom}
//         circleRadius={circleRadius}
//       />
//     </MapContainer>
//   );
// });
