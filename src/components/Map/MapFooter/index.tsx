import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Legend from './Legend';
import { memo } from 'react';

interface MapFooterProps {
  initialCener: { lat: number; lng: number };
  initialZoom: number;
  resetMap: (
    initialCener: { lat: number; lng: number },
    initialZoom: number,
  ) => void;
}

const MapFooter = ({ resetMap, initialCener, initialZoom }: MapFooterProps) => {
  return (
    <div>
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item>
          <Legend />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginBottom: '0.2rem', padding: '0.0rem 0.5rem' }}
            onClick={() => resetMap(initialCener, initialZoom)}
          >
            Reset Map
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(MapFooter);
