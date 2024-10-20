import { Fragment, memo, useState } from 'react';
import { CircleMarker, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';

import { DisplayEqData } from '../../../api/types';
import { normalizeLng } from '../../../utils/normalizeLng';
import { magnitudeColor } from '../../../constants';
import PopupComponent from './PopUp';
import { TimeZone } from '../../../context/eqDataContext';

type CircleProps = {
  data: DisplayEqData;
  timeZone: TimeZone;
  zoom: number;
  circleRadius: number;
  selectedId: string;
};

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
const markerIcon = new L.Icon({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 25],
  iconAnchor: [12, 25],
});

const Circle = (props: CircleProps) => {
  const { data, timeZone, zoom, circleRadius, selectedId } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleMouseOver = () => setTooltipOpen(true);

  const handleMouseOut = () => setTooltipOpen(false);

  const lng = normalizeLng(data.coordinates[0]);

  return (
    <Fragment key={data.id}>
      <CircleMarker
        key={data.id}
        center={[data.coordinates[1], lng]}
        color={magnitudeColor(data.mag)}
        fillColor={magnitudeColor(data.mag)}
        opacity={0.5}
        fillOpacity={0.6}
        radius={data.mag ** 1.5 * zoom * circleRadius}
        eventHandlers={{
          mouseover: handleMouseOver,
          mouseout: handleMouseOut,
        }}
      >
        {data.id === selectedId && (
          <Marker position={[data.coordinates[1], lng]} icon={markerIcon} />
        )}

        <Tooltip offset={[20, 0]} opacity={1} permanent={tooltipOpen}>
          <PopupComponent data={data} timeZone={timeZone} />
        </Tooltip>
      </CircleMarker>

      <CircleMarker
        center={[data.coordinates[1], lng]}
        color={magnitudeColor(data.mag)}
        opacity={0.2}
        radius={1}
      />
    </Fragment>
  );
};

export default memo(Circle);
