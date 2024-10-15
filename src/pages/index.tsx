import { Container, Grid, Typography, Grow, Box } from '@mui/material';
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
      {/* <Grow in> */}
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box mt={2}>
              <Typography
                variant="h3"
                component="h1"
                align="center"
                style={{ fontFamily: 'Oswald' }}
              >
                Earthquake Tracker
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mt={2}>
              <Form />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={7}>
            <Map />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={5}>
            <Table />
          </Grid>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
      {/* </Grow> */}
    </div>
  );
};

export default Home;
