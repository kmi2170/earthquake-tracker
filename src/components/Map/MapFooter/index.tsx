import { Grid, Button } from '@material-ui/core';
import Legend from './Legend';

interface MapFooterProps {
  initialCener: { lat: number; lng: number };
  initialZoom: number;
  setViewHandler: (
    initialCener: { lat: number; lng: number },
    initialZoom: number,
  ) => void;
}

const MapFooter = ({
  setViewHandler,
  initialCener,
  initialZoom,
}: MapFooterProps) => {
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
            onClick={() => setViewHandler(initialCener, initialZoom)}
          >
            Reset Map
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default MapFooter;
