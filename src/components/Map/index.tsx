import { useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import SetCenterZoom from './SetCenterZoom';
import MapFooter from './MapFooter';
import ShowCirclesOnMap from './ShowCirclesOnMap';
import { DisplayEqData } from '../../api/types';

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
  center: { lat: number; lng: number };
  zoom: number;
  initialCener: { lat: number; lng: number };
  initialZoom: number;
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
  eqData: DisplayEqData[];
  timeZone: string;
  selectedId: string;
  setSelectedId: (selectedId: string) => void;
}

const Map = ({
  center,
  zoom,
  setCenter,
  setZoom,
  initialCener,
  initialZoom,
  eqData,
  timeZone,
  selectedId,
  setSelectedId,
}: MapProps) => {
  const classes = useStyle();
  const mapRef = useRef(null);

  useEffect(() => {
    if (selectedId && eqData) {
      const selectedEqData = eqData.filter((data) => selectedId === data.id);
      const lat = selectedEqData[0]?.coordinates[1];
      const lng =
        selectedEqData[0]?.coordinates[0] < 0.0
          ? selectedEqData[0]?.coordinates[0] + 360
          : selectedEqData[0]?.coordinates[0];

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
    [selectedId],
  );

  return (
    <Paper elevation={6}>
      <div>
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
      </div>

      <MapFooter
        setViewHandler={setViewHandler}
        initialCener={initialCener}
        initialZoom={initialZoom}
      />
    </Paper>
  );
};

export default Map;
