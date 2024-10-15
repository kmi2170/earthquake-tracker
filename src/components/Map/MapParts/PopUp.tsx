import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import Typography from '@mui/material/Typography';

import { DisplayEqData } from '../../../api/types';
import { formatTimeDayjs } from '../../../utils/formatTimeDayjs';
import { formatDigits } from '../../../utils/formatDigits';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
const markerIcon = new L.Icon({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 25],
  iconAnchor: [12, 25],
});

interface PopupProps {
  data: DisplayEqData;
  timeZone: string;
  selectedId: string;
  lng: number;
}

const Popup = ({ data, timeZone, selectedId, lng }: PopupProps) => {
  return (
    <div>
      {data.id === selectedId && (
        <Marker position={[data.coordinates[1], lng]} icon={markerIcon} />
      )}

      <Tooltip offset={[20, 0]} opacity={1}>
        <Typography variant="h5">M {formatDigits(data.mag, 1, 1)}</Typography>
        <Typography variant="h6" color="textSecondary">
          {formatTimeDayjs(data.time, timeZone)}
        </Typography>
        <Typography variant="h6">{data.place}</Typography>
        <Typography variant="h6">
          Depth: {formatDigits(data.coordinates[2], 1, 1)} km
        </Typography>

        <Typography variant="h6" color="textSecondary">
          Lat: {formatDigits(data.coordinates[1], 3, 3)}, Lng:{' '}
          {formatDigits(data.coordinates[0], 3, 3)}
        </Typography>

        {data.tsunami && (
          <Typography variant="h6" color="error">
            Potential Tsunami Threat
          </Typography>
        )}
      </Tooltip>
    </div>
  );
};

export default Popup;
