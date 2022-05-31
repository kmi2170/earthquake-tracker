import { useMapEvent } from 'react-leaflet';

interface GetCenterZoomProps {
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
}

const GetCenterZoom = ({ setCenter, setZoom }: GetCenterZoomProps) => {
  const map = useMapEvent('moveend', () => {
    setCenter(map.getCenter());
    setZoom(map.getZoom());
  });
  return null;
};

export default GetCenterZoom;
