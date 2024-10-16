import { memo, useMemo } from 'react';

import { CircleMarker } from 'react-leaflet';

import { DisplayEqData } from '../../../api/types';
import { magColor } from '../../../constants';
import { normalizeLng } from '../../../utils/normalizeLng';
import PopupComponent from './PopUp';

type ShowCirclesOnMapProps = {
  eqData: DisplayEqData[];
  timeZone: string;
  selectedId: string;
  zoom: number;
  cRadius: number;
};

const ShowCirclesOnMap = ({
  eqData,
  timeZone,
  selectedId,
  zoom,
  cRadius,
}: ShowCirclesOnMapProps) => {
  const latlons = useMemo(
    () => eqData?.map((data) => normalizeLng(data.coordinates[0])),
    [eqData],
  );

  return (
    <div>
      {eqData?.map((data: DisplayEqData, i) => {
        return (
          <div key={data.id}>
            <CircleMarker
              center={[data.coordinates[1], latlons[i]]}
              color={magColor(data.mag)}
              fillColor={magColor(data.mag)}
              opacity={0.5}
              fillOpacity={0.6}
              radius={data.mag ** 1.5 * zoom * cRadius}
            >
              <PopupComponent
                data={data}
                timeZone={timeZone}
                selectedId={selectedId}
                lng={latlons[i]}
              />
            </CircleMarker>

            <CircleMarker
              center={[data.coordinates[1], latlons[i]]}
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

export default memo(ShowCirclesOnMap);
