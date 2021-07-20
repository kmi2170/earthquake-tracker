import { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import styles from './Map.module.css';

import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ShowDataOnMap from './ShowDataOnMap';
import MapFooter from './MapFooter';
import { DataProps } from '../api/interface';

const useStyle = makeStyles((theme) => ({
  map: {
    width: '100%',
    height: '70vh',
    //height: '100%',
    //height: '100vh',
    padding: 0,
    margin: 0,
  },
  leaflet: {
    width: '100%',
    //height: '70vh',
    height: '100%',
    //height: '100vh',
  },
  [theme.breakpoints.down('sm')]: {
    map: {
      height: '50vh',
    },
    leaflet: {
      height: '50vh',
    },
  },
  // [theme.breakpoints.up('md')]: {},
  // [theme.breakpoints.up('lg')]: {},
}));

interface Props {
  center: { lat: number; lng: number };
  zoom: number;
  initialCener: { lat: number; lng: number };
  initialZoom: number;
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
  eqData: DataProps[];
  timeZone: string;
  selectedId: string;
  setSelectedId: (selectedId: string) => void;
}

const Map: React.FC<Props> = ({
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
}) => {
  const classes = useStyle();

  useEffect(() => {
    if (selectedId && eqData) {
      const selectedEqData = eqData.filter((data) => selectedId === data.id);
      // console.log('selectedId', selectedId);
      // console.log(selectedEqData[0].coordinates[0]);
      const lat = selectedEqData[0]?.coordinates[1];
      const lng =
        selectedEqData[0]?.coordinates[0] < 0.0
          ? selectedEqData[0]?.coordinates[0] + 360
          : selectedEqData[0]?.coordinates[0];

      flyToHandler({ lat, lng }, 4);

      // const PopupToOpen = popUpRef.current[selectedId];
      // PopupToOpen.openPopup();
      // console.log(popUpRef.current[selectedId]);
    }
  }, [selectedId]);

  const mapRef = useRef(null);

  // const popUpRef = useRef({});

  const setViewHandler = (cnt: { lat: number; lng: number }, zm: number) => {
    // mapRef.current.setView(cnt, zm);
    mapRef.current?.flyTo(cnt, zm, {
      duration: 3,
    });
    setSelectedId('');
    console.log(mapRef.current);
  };

  const flyToHandler = (cnt: { lat: number; lng: number }, zm: number) => {
    mapRef.current?.flyTo(cnt, zm, {
      duration: 3,
    });
  };

  // const onMoveHandler = (event: any) => {
  //   const currentCenter = event.target.getCenter();
  //   const currentZoom = event.target.getZoom();
  //   console.log(currentCenter, currentZoom);
  // };

  return (
    <Paper elevation={6}>
      <div>
        <MapContainer
          className={classes.map}
          // ref={mapRef}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
          center={center}
          zoom={zoom}
          scrollWheelZoom={true}
          //   style={{ height: '70vh', width: '100%' }}
          // onMoveEnd={onMoveHandler}
        >
          {/*
           */}
          <CurrentCenterZoom setCenter={setCenter} setZoom={setZoom} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ShowDataOnMap
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

interface CurrentCenterZoomProps {
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
}

const CurrentCenterZoom = ({ setCenter, setZoom }: CurrentCenterZoomProps) => {
  const map = useMapEvent('moveend', () => {
    setCenter(map.getCenter());
    setZoom(map.getZoom());
    // console.log(map.getCenter(), map.getZoom());
  });
  return null;
};
