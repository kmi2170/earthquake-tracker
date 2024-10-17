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
import Slider from './MapParts/Slider';
import { useEqData } from '../../context/useEqData';
import { useMapData } from '../../context/useMapData';

const useStyles = makeStyles((theme) => ({
  map: {
    width: '100%',
    height: '70vh',
    padding: 0,
    margin: 0,
  },
  leaflet: {
    width: '100%',
    height: '100%',
  },
  [theme.breakpoints.down('md')]: {
    map: {
      height: '50vh',
    },
    leaflet: {
      height: '50vh',
    },
  },
}));

const MapComponent = () => {
  const classes = useStyles();
  const mapRef = useRef(null);

  const { period, minMag, timeZone } = useEqData();

  const {
    initialCenter,
    center,
    setCenter,
    initialZoom,
    zoom,
    setZoom,
    selectedId,
    setSelectedId,
  } = useMapData();
  const { eqData, isError, error } = useCustomQuery(period, minMag);

  const [cRadius, setCRadius] = useState(1);

  const moveToEpicenter = useCallback(
    (selectedId: string) => {
      const selectedEqData = eqData.filter((data) => selectedId === data.id);
      const lat = selectedEqData[0]?.coordinates[1];
      const lng = normalizeLng(selectedEqData[0]?.coordinates[0]);

      (mapRef.current as Map)?.flyTo({ lat, lng }, 4, {
        duration: 3,
      });
    },
    [eqData],
  );

  const resetMap = useCallback(
    (center: { lat: number; lng: number }, zoom: number) => {
      (mapRef.current as Map)?.flyTo(center, zoom, { duration: 3 });
      setSelectedId('');
    },
    [setSelectedId],
  );

  const changeCRadius = useCallback((value: number) => setCRadius(value), []);

  useEffect(() => {
    if (selectedId && eqData) {
      moveToEpicenter(selectedId);
    }
  }, [selectedId, eqData, moveToEpicenter]);

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Paper elevation={6}>
      <MapContainer
        className={classes.map}
        ref={mapRef}
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
      >
        <GetCenterZoom setCenter={setCenter} setZoom={setZoom} />

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ShowCirclesOnMap
          eqData={eqData}
          timeZone={timeZone}
          selectedId={selectedId}
          zoom={zoom}
          cRadius={cRadius}
        />
      </MapContainer>

      <Slider value={cRadius} changeValue={changeCRadius} />

      <MapFooter
        resetMap={resetMap}
        initialCenter={initialCenter}
        initialZoom={initialZoom}
      />
    </Paper>
  );
};

export default MapComponent;
