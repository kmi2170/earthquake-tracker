import { memo, useMemo } from 'react';

import { CircleMarker } from 'react-leaflet';

import { DisplayEqData } from '../../../api/types';
import { magnitudeColor } from '../../../constants';
import { normalizeLng } from '../../../utils/normalizeLng';
import PopupComponent from './PopUp';

type ShowCirclesOnMapProps = {
  eqData: DisplayEqData[];
  timeZone: string;
  selectedId: string;
  zoom: number;
  circleRadius: number;
};

const ShowCirclesOnMap = ({
  eqData,
  timeZone,
  selectedId,
  zoom,
  circleRadius,
}: ShowCirclesOnMapProps) => {
  const latlons = useMemo(
    () => eqData?.map((data) => normalizeLng(data.coordinates[0])),
    [eqData],
  );

  return (
    <>
      {eqData?.map((data: DisplayEqData, i) => {
        return (
          <div key={data.id}>
            <CircleMarker
              center={[data.coordinates[1], latlons[i]]}
              color={magnitudeColor(data.mag)}
              fillColor={magnitudeColor(data.mag)}
              opacity={0.5}
              fillOpacity={0.6}
              radius={data.mag ** 1.5 * zoom * circleRadius}
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
              color={magnitudeColor(data.mag)}
              opacity={0.2}
              radius={1}
            />
          </div>
        );
      })}
    </>
  );
};

export default memo(ShowCirclesOnMap);
