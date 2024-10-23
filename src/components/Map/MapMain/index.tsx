'use client';

import { forwardRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { AxiosError } from 'axios';
import { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import makeStyles from '@mui/styles/makeStyles';

import GetCenterZoom from '../MapParts/GetCenterZoom';
import ShowCirclesOnMap from '../MapParts/ShowCirclesOnMap';
import { useCustomQuery } from '../../../hooks/useCustomQuery';
import { useMapData } from '../../../context/useMapData';
import { useEqDate } from '../../../context/useEqDate';
import { useEqMag } from '../../../context/useEqMag';
import LoadingSpinner from '../MapParts/LoadingSpinner';
import ErrorMessage from '../MapParts/ErrorMessage';

const useStyles = makeStyles(() => ({
  map: {
    width: '100%',
    height: '50vh',
    padding: 0,
    margin: 0,
  },
}));

type MapMainProps = {
  circleRadius: number;
};

const MapMain = forwardRef<Map, MapMainProps>(function MapMain(params, ref) {
  const { circleRadius } = params;

  const classes = useStyles();

  const { minMag, maxMag } = useEqMag();

  const { center, setCenter, initialZoom, zoom, setZoom, selectedId } =
    useMapData();

  const { endDate, period, timeZone } = useEqDate();

  const { eqData, isFetching, isError, error } = useCustomQuery(
    period,
    endDate,
  );

  const filteredEqData = eqData
    .filter((data) => data.mag >= minMag)
    .filter((data) => data.mag <= (maxMag === 8 ? 100 : maxMag))
    .sort((a, b) => a.mag - b.mag);

  if (isError) {
    return <ErrorMessage error={error as AxiosError} />;
  }

  if (initialZoom === null || zoom === null) return;

  return (
    <MapContainer
      className={classes.map}
      ref={ref}
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
  );
});

export default MapMain;
