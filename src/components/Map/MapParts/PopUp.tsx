import Typography from '@mui/material/Typography';

import { DisplayEqData } from '../../../api/types';
import { formatTimeDayjs } from '../../../utils/formatTimeDayjs';

interface PopupContentProps {
  data: DisplayEqData;
  timeZone: string;
}

const PopupContent = ({ data, timeZone }: PopupContentProps) => {
  return (
    <>
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
    </>
  );
};

export default PopupContent;
