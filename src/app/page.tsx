'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useDynamicMap } from '../hooks/useMap';
import Table from '../components/Table';
import Form from '../components/Form';
import Footer from '../components/Footer';

const Home = () => {
  const Map = useDynamicMap();

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: '100vh',
        backgroundImage:
          'linear-gradient(to bottom, rgb(255,255,255,1.0), rgba(218,165,32,0.1))',
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '2000px' }}>
        <Grid container spacing={3}>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{
              mt: 3,
            }}
          >
            <Typography variant="h3" component="h1" align="center">
              Earthquake Tracker
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{
              mt: 2,
            }}
          >
            <Form />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 7, xl: 8 }}>
            <Map />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 5, xl: 4 }}>
            <Table />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
