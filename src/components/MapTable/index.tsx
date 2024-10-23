import Grid from '@mui/material/Grid2';

import Table from '../Table';
import MapComponent from '../Map';

const MapTable = () => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7, xl: 8 }}>
        <MapComponent />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5, xl: 4 }}>
        <Table />
      </Grid>
    </Grid>
  );
};

export default MapTable;
