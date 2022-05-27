import { useEffect, useState, useMemo } from 'react';
import router, { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios from 'axios';

import { Container, Grid, Typography, Grow, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Table from '../components/Table';
import Form from '../components/Form';
import Footer from '../components/Footer';
import { useMap } from '../hooks';
import { RowEqData } from '../api/types';
import { getStartEndTimeDayjs } from '../utils/getStartEndTimeDayjs';
import { extractedEqData } from '../utils/extractEqData';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    backgroundImage:
      'linear-gradient(to bottom, rgb(255,255,255,1.0), rgba(218,165,32,0.1))',
  },
}));

const fetcher = async (url: string) => {
  try {
    const { data } = await axios(url);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const requestUrl = (startTime: string, endTime: string, minMag: number) =>
  `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minmagnitude=${minMag}`;

const config = {
  refetchInterval: 300000,
  onSuccess: () => {
    console.log('Success data fetching');
  },
};

const initialPeriod = 3;
const initialMinMag = 4;

const Home: React.FC = () => {
  const classes = useStyles();
  const { query } = useRouter();

  const [period, setPeriod] = useState<number>(initialPeriod);
  const [minMag, setMinMag] = useState<number>(initialMinMag);
  const [timeZone, setTimeZone] = useState<string>('local');

  const initialCener = { lat: 0, lng: 180 };
  const initialZoom = 1;
  const [center, setCenter] = useState(initialCener);
  const [zoom, setZoom] = useState(initialZoom);

  const [selectedId, setSelectedId] = useState<string>('');

  // const { starttime, endtime } = getStartEndTime(period);
  const { startTime, endTime } = getStartEndTimeDayjs(period);
  // const { starttime, endtime } = getStartEndUTCTime(period);
  // console.log(starttime, endtime);

  //const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&minmagnitude=${minMag}`;
  // const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&minmagnitude=${minMag}`;
  const url = requestUrl(startTime, endTime, minMag);

  useEffect(() => {
    router.push({
      pathname: '/',
      query: {
        startTime,
        minMag,
      },
    });
  }, [startTime, minMag]);

  const { data, isLoading, isError, error } = useQuery<RowEqData, Error>(
    ['eqData', url],
    () => fetcher(url),
    config,
  );

  const eqData = useMemo(() => extractedEqData(data) || [], [data]);

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
                <Form
                  period={period}
                  setPeriod={setPeriod}
                  initialPeriod={initialPeriod}
                  minMag={minMag}
                  setMinMag={setMinMag}
                  initialMinMag={initialMinMag}
                  timeZone={timeZone}
                  setTimeZone={setTimeZone}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={7}>
              <Map
                center={center}
                zoom={zoom}
                setCenter={setCenter}
                setZoom={setZoom}
                initialCener={initialCener}
                initialZoom={initialZoom}
                eqData={eqData}
                timeZone={timeZone}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={5}>
              <Table
                eqData={eqData}
                timeZone={timeZone}
                setSelectedId={setSelectedId}
              />
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
