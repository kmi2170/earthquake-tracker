import { useState, useMemo } from 'react';
import { Container, Grid, Typography, Grow, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useMap } from '../hooks/useMap';
import { useEqData } from '../context/hook';
import { useCustomQuery } from '../hooks/useCustomQuery';
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

const Home: React.FC = () => {
  const classes = useStyles();
  const [selectedId, setSelectedId] = useState<string>('');

  const { period, minMag } = useEqData();
  const { eqData, isError, error } = useCustomQuery(period, minMag);
  const Map = useMap(eqData);

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className={classes.root}>
      <Grow in>
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
              <Map
                eqData={eqData}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={5}>
              <Table eqData={eqData} setSelectedId={setSelectedId} />
            </Grid>
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
