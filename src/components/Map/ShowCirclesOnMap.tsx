import { useMemo } from 'react';
import { CircleMarker } from 'react-leaflet';
import { DisplayEqData } from '../../api/types';

import PopupComponent from './PopUp';
import { magColor } from '../../constants';

interface ShowCirclesOnMapProps {
  eqData: DisplayEqData[];
  timeZone: string;
  selectedId: string;
}

const ShowCirclesOnMap = ({
  eqData,
  timeZone,
  selectedId,
}: ShowCirclesOnMapProps) => {
  const lngs = useMemo( () =>
      eqData?.map((data) => {
        if (data.coordinates[0] < 0.0) return data.coordinates[0] + 360;
        return data.coordinates[0];
      }),
    [eqData],
  );

  return (
    <div>
      {eqData?.map((data: DisplayEqData, i) => {
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
            />
          </div>
        );
      })}
    </div>
  );
};

export default ShowCirclesOnMap;
