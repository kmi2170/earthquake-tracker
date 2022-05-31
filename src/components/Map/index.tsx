import { useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import GetCenterZoom from './MapParts/GetCenterZoom';
import ShowCirclesOnMap from './MapParts/ShowCirclesOnMap';
import MapFooter from './MapFooter';
import { normalizeLng } from '../../utils/normalizeLng';
import { useEqData } from '../../context/hook';
import { useCustomQuery } from '../../hooks/useCustomQuery';

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
  [theme.breakpoints.down('sm')]: {
    map: {
      height: '50vh',
    },
    leaflet: {
      height: '50vh',
    },
  },
}));

const Map = () => {
  const classes = useStyles();
  const mapRef = useRef(null);

  const {
    period,
    minMag,
    timeZone,
    initialCener,
    center,
    setCenter,
    initialZoom,
    zoom,
    setZoom,
    selectedId,
    setSelectedId,
  } = useEqData();
  const { eqData, isError, error } = useCustomQuery(period, minMag);

  if (isError) return <div>Error: {error.message}</div>;

  useEffect(() => {
    if (selectedId && eqData) {
      moveToEpicenter(selectedId);
    }
  }, [selectedId]);

  const moveToEpicenter = useCallback((selectedId) => {
    const selectedEqData = eqData.filter((data) => selectedId === data.id);
    const lat = selectedEqData[0]?.coordinates[1];
    const lng = normalizeLng(selectedEqData[0]?.coordinates[0]);

    mapRef.current?.flyTo({ lat, lng }, 4, {
      duration: 3,
    });
  }, []);

  const resetMap = useCallback(
    (center: { lat: number; lng: number }, zoom: number) => {
      mapRef.current?.flyTo(center, zoom, { duration: 3 });
      setSelectedId('');
    },
    []
  );

  return (
    <Paper elevation={6}>
      <MapContainer
        className={classes.map}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
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
        />
      </MapContainer>

      <MapFooter
        resetMap={resetMap}
        initialCener={initialCener}
        initialZoom={initialZoom}
      />
    </Paper>
  );
};

export default Map;
