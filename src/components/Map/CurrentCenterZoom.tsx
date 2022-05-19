import { useMapEvent } from 'react-leaflet';

interface CurrentCenterZoomProps {
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
}

const CurrentCenterZoom = ({ setCenter, setZoom }: CurrentCenterZoomProps) => {
  const map = useMapEvent('moveend', () => {
    setCenter(map.getCenter());
    setZoom(map.getZoom());
    // console.log(map.getCenter(), map.getZoom());
  });
  return null;
};

export default CurrentCenterZoom;
