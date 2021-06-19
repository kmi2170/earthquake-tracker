import { Popup, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { Typography } from '@material-ui/core';

import { formatTime } from '../utils/formatTime';
import { DataProps } from '../api/interface';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
const markerIcon = new L.Icon({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  //   iconUrl: '/markerIcon.png',
});

interface PopupComponentProps {
  data: DataProps;
  timeZone: string;
  selectedId: string;
  lng: number;
}

const PopupComponent: React.FC<PopupComponentProps> = ({
  data,
  timeZone,
  selectedId,
  lng,
}) => {
  return (
    <div>
      {data.id === selectedId && (
        <Marker
          position={[data.coordinates[1], lng]}
          icon={markerIcon}
          // ref={(m) => {
          //   popUpRef.current[data.id] = m;
          // }}
        ></Marker>
      )}

      <Tooltip
        // minWidth={350}
        // ref={(m) => {
        //   popUpRef.current[data.id] = m;
        // }}
        offset={[20, 0]}
        opacity={1}
      >
        <Typography variant="h5">
          M
          {data.mag.toLocaleString('en-US', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {formatTime(data.time, timeZone)}
        </Typography>
        <Typography variant="subtitle2">{data.place}</Typography>
        <Typography variant="subtitle2">
          Depth:{' '}
          {data.coordinates[2].toLocaleString('en-US', {
            maximumFractionDigits: 1,
            minimumFractionDigits: 1,
          })}{' '}
          km
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Lat:{' '}
          {data.coordinates[1].toLocaleString('en-US', {
            maximumFractionDigits: 3,
            minimumFractionDigits: 3,
          })}
          , Lng:{' '}
          {data.coordinates[0].toLocaleString('en-US', {
            maximumFractionDigits: 3,
            minimumFractionDigits: 3,
          })}
        </Typography>
        {data.tsunami ? (
          <Typography variant="subtitle2" color="error">
            Potential Tsunami Threat
          </Typography>
        ) : null}
      </Tooltip>
      {/* 
      <Popup minWidth={350}>
        <Typography variant="h5">
          {data.mag.toLocaleString('en-US', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {formatTime(data.time, timeZone)}
        </Typography>
        <Typography variant="subtitle2">{data.place}</Typography>
        <Typography variant="subtitle2">
          Depth:{' '}
          {data.coordinates[2].toLocaleString('en-US', {
            maximumFractionDigits: 1,
            minimumFractionDigits: 1,
          })}{' '}
          km
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Lat:{' '}
          {data.coordinates[1].toLocaleString('en-US', {
            maximumFractionDigits: 3,
            minimumFractionDigits: 3,
          })}
          , Lng:{' '}
          {data.coordinates[0].toLocaleString('en-US', {
            maximumFractionDigits: 3,
            minimumFractionDigits: 3,
          })}
        </Typography>
        {data.tsunami ? (
          <Typography variant="subtitle2" color="error">
            Potential Tsunami Threat
          </Typography>
        ) : null}
      </Popup>
      */}
    </div>
  );
};

export default PopupComponent;
