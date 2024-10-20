import { DisplayEqData } from '../../../api/types';
import { TimeZone } from '../../../context/eqDataContext';
import Circle from './Circle';

type ShowCirclesOnMapProps = {
  eqData: DisplayEqData[];
  timeZone: TimeZone;
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
  return (
    <>
      {eqData?.map((data: DisplayEqData) => {
        return (
          <Circle
            key={data.id}
            data={data}
            timeZone={timeZone}
            selectedId={selectedId}
            zoom={zoom}
            circleRadius={circleRadius}
          />
        );
      })}
    </>
  );
};

export default ShowCirclesOnMap;
