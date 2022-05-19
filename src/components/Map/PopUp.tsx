import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import Typography from '@material-ui/core/Typography';

import { DisplayEqData } from '../../api/types';
import { formatTime } from '../../utils/formatTime';
import { formatDigits } from '../../utils/formatDigits';
import { useMemo } from 'react';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({

interface PopupComponentProps {
  data: DisplayEqData;
  timeZone: string;
  selectedId: string;
  lng: number;
}

const PopupComponent = ({
  data,
  timeZone,
  selectedId,
  lng,
}: PopupComponentProps) => {
  const markerIcon = useMemo(
    () =>
      new L.Icon({
        iconRetinaUrl: '/marker-icon-2x.png',
        iconUrl: '/marker-icon.png',
        shadowUrl: '/marker-shadow.png',
        iconSize: [25, 25],
        iconAnchor: [12, 25],
      }),
    [],
  );

  return (
    <div>
      {data.id === selectedId && (
        <Marker position={[data.coordinates[1], lng]} icon={markerIcon} />
      )}

      <Tooltip offset={[20, 0]} opacity={1}>
        <Typography variant="h5">M {formatDigits(data.mag, 1, 1)}</Typography>
        <Typography variant="h6" color="textSecondary">
          {formatTime(data.time, timeZone)}
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

export default PopupComponent;
