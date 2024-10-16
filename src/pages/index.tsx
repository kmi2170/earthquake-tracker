import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import makeStyles from '@mui/styles/makeStyles';

import { useDynamicMap } from '../hooks/useMap';
import Table from '../components/Table';
import Form from '../components/Form';
import Footer from '../components/Footer';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    backgroundImage:
      'linear-gradient(to bottom, rgb(255,255,255,1.0), rgba(218,165,32,0.1))',
  },
}));

const Home = () => {
  const classes = useStyles();

  const Map = useDynamicMap();

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{
              mt: 2,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              align="center"
              style={{ fontFamily: 'Oswald' }}
            >
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
    </div>
  );
};

export default Home;
