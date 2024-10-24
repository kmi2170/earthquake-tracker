import { Dispatch, memo, SetStateAction } from 'react';

import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';

import Legend from './Legend';

type MapFooterProps = {
  initialCenter: { lat: number; lng: number };
  initialZoom: number;
  setReset: Dispatch<SetStateAction<boolean>>;
};

const MapFooter = (props: MapFooterProps) => {
  const { setReset } = props;

  const handleReset = () => {
    setReset(true);
  };

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
            onClick={handleReset}
          >
            Reset Map
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(MapFooter);
