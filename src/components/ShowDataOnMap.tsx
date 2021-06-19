// import { Circle, CircleMarker, Popup, Marker } from 'react-leaflet';
import { CircleMarker } from 'react-leaflet';
import { DataProps } from '../api/interface';

import PopupComponent from './PopUp';

// import { Typography } from '@material-ui/core';
// import { formatTime } from '../utils/formatTime';
import { magColor } from '../utils/magColor';

interface ShowDataOnMapProps {
  eqData: DataProps[];
  timeZone: string;
  selectedId: string;
}

const ShowDataOnMap: React.FC<ShowDataOnMapProps> = ({
  eqData,
  timeZone,
  selectedId,
}) => {
  const lngs = eqData?.map((data) => {
    if (data.coordinates[0] < 0.0) return data.coordinates[0] + 360;
    return data.coordinates[0];
  });

  return (
    <div>
      {eqData?.map((data: DataProps, i) => {
        return (
          <div key={data.id}>
            <CircleMarker
              center={[data.coordinates[1], lngs[i]]}
              color={magColor(data.mag)}
              fillColor={magColor(data.mag)}
              opacity={0.5}
              fillOpacity={0.6}
              radius={data.mag ** 1.5 * 1.0}
            >
              <PopupComponent
                data={data}
                timeZone={timeZone}
                selectedId={selectedId}
                lng={lngs[i]}
              />
            </CircleMarker>
            <CircleMarker
              center={[data.coordinates[1], lngs[i]]}
              color={magColor(data.mag)}
              opacity={0.2}
              radius={1}
            ></CircleMarker>
          </div>
        );
      })}
    </div>
  );
};

export default ShowDataOnMap;
