import { Grid, Button, Tooltip, Typography, Hidden } from '@material-ui/core';

import MouseOverPopover from './Popover';

interface MapFooterProps {
  initialCener: { lat: number; lng: number };
  initialZoom: number;
  setViewHandler: (
    initialCener: { lat: number; lng: number },
    initialZoom: number
  ) => void;
}

const MapFooter: React.FC<MapFooterProps> = ({
  setViewHandler,
  initialCener,
  initialZoom,
}) => {
  return (
    <div>
      <Grid container justify="space-around" alignItems="center">
        <Grid item>
          <MouseOverPopover />
        </Grid>
        {/* 
        <Hidden xsDown>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Hover over a Circle to View Details
            </Typography>
          </Grid>
        </Hidden>
      */}
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
