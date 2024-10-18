import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import Typography from '@mui/material/Typography';

import { DisplayEqData } from '../../../api/types';
import { formatTimeDayjs } from '../../../utils/formatTimeDayjs';

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
        <Typography variant="h5">M {data?.mag?.toFixed(1)}</Typography>
        <Typography variant="h6" color="textSecondary">
          {formatTimeDayjs(data.time, timeZone)}
        </Typography>
        <Typography variant="h6">{data?.place}</Typography>
        <Typography variant="h6">
          Depth: {data?.coordinates[2]?.toFixed(1)} km
        </Typography>

        <Typography variant="h6" color="textSecondary">
          Lat: {data?.coordinates[1].toFixed(3)}, Lng:{' '}
          {data?.coordinates[0].toFixed(3)}
        </Typography>

        {data?.tsunami ? (
          <Typography variant="h6" color="error">
            Potential Tsunami Threat
          </Typography>
        ) : null}
      </Tooltip>
    </div>
  );
};

export default Popup;
