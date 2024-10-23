import { memo } from 'react';

import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';

import Legend from './Legend';

interface MapFooterProps {
  initialCenter: { lat: number; lng: number };
  initialZoom: number;
  resetMap: (
    initialCener: { lat: number; lng: number },
    initialZoom: number,
  ) => void;
}

const MapFooter = ({
  resetMap,
  initialCenter,
  initialZoom,
}: MapFooterProps) => {
  return (
    <div>
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid>
          <Legend />
        </Grid>

        <Grid>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginBottom: '1.0rem', padding: '0.25rem 0.75rem' }}
            onClick={() => resetMap(initialCenter, initialZoom)}
          >
            Reset Map
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(MapFooter);
