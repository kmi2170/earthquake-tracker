import Grid from '@mui/material/Grid2';

import { useDynamicMap } from '../../hooks/useMap';
import Table from '../Table';

const MapTable = () => {
  const Map = useDynamicMap();

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 6, lg: 7, xl: 8 }}>
        <Map />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 6, lg: 5, xl: 4 }}>
        <Table />
      </Grid>
    </Grid>
  );
};

export default MapTable;
