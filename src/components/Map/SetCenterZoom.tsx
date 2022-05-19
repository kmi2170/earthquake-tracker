import { useMapEvent } from 'react-leaflet';

interface SetCenterZoomProps {
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
}

const SetCenterZoom = ({ setCenter, setZoom }: SetCenterZoomProps) => {
  const map = useMapEvent('moveend', () => {
    setCenter(map.getCenter());
    setZoom(map.getZoom());
  });
  return null;
};

export default SetCenterZoom;
