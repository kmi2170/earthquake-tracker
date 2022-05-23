import { useEffect, useState, useMemo } from 'react';
import router, { useRouter } from 'next/router';

import { useQuery } from 'react-query';
// import { QueryClient } from 'react-query';
// import { dehydrate } from 'react-query/hydration';
//import { GetServerSideProps } from 'next';

import axios from 'axios';

import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Grow,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import TableComponent from '../components/Table';
import Table from '../components/Table';
import SelectForm from '../components/Form';
import Footer from '../components/Footer';
// import Variants from '../components/Skelton';

import { useMap } from '../hooks';
import { RowEqData, DisplayEqData } from '../api/types';
import { getStartEndTime } from '../utils/getTime';
import { extractedEqData } from '../utils/extractEqData';
// import { getStartEndUTCTime } from '../utils/getUTCTime';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    // backgroundImage: 'linear-gradient(white,grey)',
    backgroundImage:
      //'linear-gradient(to bottom, rgba(0,0,0,0), rgba(250,250,210,1))',
      //'linear-gradient(to bottom, rgba(0,0,0,0), rgba(218,165,32,.2))',
      // 'linear-gradient(to bottom, rgb(102,255,255,0.15), rgba(218,165,32,0.25))',
      'linear-gradient(to bottom, rgb(255,255,255,1.0), rgba(218,165,32,0.1))',
  },
  container: {
    // padding: 0,
    // margin: 0,
  },
  gridContainer: {
    // justify: 'center',
    // alignItems: 'center',
  },
  map: {
    // font: '#009999',
    // background: '#009900',
  },
  table: {
    // background: '#999900',
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

const requestUrl = (starttime: string, minMag: number) =>
  `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&minmagnitude=${minMag}`;

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

  const { starttime, endtime } = getStartEndTime(period);
  // const { starttime, endtime } = getStartEndUTCTime(period);
  // console.log(starttime, endtime);

  //const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&minmagnitude=${minMag}`;
  // const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&minmagnitude=${minMag}`;
  const url = requestUrl(starttime, minMag);

  useEffect(() => {
    router.push({
      pathname: '/',
      query: {
        starttime,
        minMag,
      },
    });
  }, [starttime, minMag]);

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
        <Container className={classes.container} maxWidth={false}>
          <Grid className={classes.gridContainer} container spacing={2}>
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
                <SelectForm
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

            <Grid item className={classes.map} xs={12} sm={6} md={6} lg={7}>
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

            <Grid item className={classes.table} xs={12} sm={6} md={6} lg={5}>
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

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const starttime = query.starttime
//     ? query.starttime
//     : getStartEndUTCTime(initialPeriod).starttime;
//   const minMag = query.minMag ? query.minMag : initialMinMag;

//   const url = requestUrl(starttime as string, +minMag);
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(['eqData', url], () => fetcher(url));
//   console.log(dehydrate(queryClient));
//   console.log('SSR');

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
