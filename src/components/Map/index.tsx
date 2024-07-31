import { useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Map } from 'leaflet';
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

const MapComponent = () => {
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

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (selectedId && eqData) {
      moveToEpicenter(selectedId);
    }
  }, [selectedId]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const moveToEpicenter = useCallback(
    (selectedid: string) => {
      const selectedeqdata = eqData.filter((data) => selectedid === data.id);
      const lat = selectedeqdata[0]?.coordinates[1];
      const lng = normalizeLng(selectedeqdata[0]?.coordinates[0]);

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

  if (isError) return <div>Error: {error.message}</div>;

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
          zoom={zoom}
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

export default MapComponent;
