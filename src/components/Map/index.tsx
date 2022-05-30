import { useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import SetCenterZoom from './MapParts/SetCenterZoom';
import ShowCirclesOnMap from './MapParts/ShowCirclesOnMap';
import MapFooter from './MapFooter';
import { DisplayEqData } from '../../api/types';
import { normalizeLng } from '../../utils/normalizeLng';
import { useEqData } from '../../context/hook';

const useStyle = makeStyles((theme) => ({
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

interface MapProps {
  eqData: DisplayEqData[];
  selectedId: string;
  setSelectedId: (selectedId: string) => void;
}

const Map = ({ eqData, selectedId, setSelectedId }: MapProps) => {
  const classes = useStyle();
  const mapRef = useRef(null);

  const {
    timeZone,
    initialCener,
    center,
    setCenter,
    initialZoom,
    zoom,
    setZoom,
  } = useEqData();

  useEffect(() => {
    if (selectedId && eqData) {
      const selectedEqData = eqData.filter((data) => selectedId === data.id);
      const lat = selectedEqData[0]?.coordinates[1];
      const lng = normalizeLng(selectedEqData[0]?.coordinates[0]);

      mapRef.current?.flyTo({ lat, lng }, 4, {
        duration: 3,
      });
    }
  }, [selectedId]);

  const setViewHandler = useCallback(
    (cnt: { lat: number; lng: number }, zm: number) => {
      mapRef.current?.flyTo(cnt, zm, { duration: 3 });
      setSelectedId('');
    },
    [selectedId]
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
        <SetCenterZoom setCenter={setCenter} setZoom={setZoom} />

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
        setViewHandler={setViewHandler}
        initialCener={initialCener}
        initialZoom={initialZoom}
      />
    </Paper>
  );
};

export default Map;
