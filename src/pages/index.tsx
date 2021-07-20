import { useEffect, useState, useMemo, useRef } from 'react';

import { useQuery } from 'react-query';
// import queryClient from '../utils/reactQuery';
// import { dehydrate } from 'react-query/hydration';

import axios from 'axios';

import dynamic from 'next/dynamic';
// import { GetServerSideProps, GetStaticProps } from 'next';

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
import SEO from '../components/SEO';
import EnhancedTable from '../components/Table';
import SelectForm from '../components/Form';
import Footer from '../components/Footer';
// import Variants from '../components/Skelton';
// import Map from '../components/Map';

import { IData, DataProps } from '../api/interface';
import { getStartEndTime } from '../utils/getTime';

const useStyles = makeStyles((theme) => ({
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
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const config = {
  keepPreviousData: true,
  cacheTime: 10000,
  onSuccess: () => {
    console.log('Success data fetching');
  },
};

const Home: React.FC = () => {
  const classes = useStyles();

  const [eqData, setEqData] = useState<DataProps[]>([]);

  const initialPeriod = 3;
  const [period, setPeriod] = useState<number>(initialPeriod);
  const initialMinMag = 4;
  const [minMag, setMinMag] = useState<number>(initialMinMag);
  const [timeZone, setTimeZone] = useState<string>('local');

  const initialCener = { lat: 0, lng: 180 };
  const initialZoom = 1;
  const [center, setCenter] = useState(initialCener);
  const [zoom, setZoom] = useState(initialZoom);

  const [selectedId, setSelectedId] = useState<string>('');

  const Map: any = useMemo(
    () =>
      dynamic(() => import('../components/Map'), {
        loading: () => (
          <div>
            <CircularProgress />
            Map is Loading...
          </div>
        ),
        ssr: false,
      }),
    [eqData]
  );

  const { starttime, endtime } = getStartEndTime(period);

  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&minmagnitude=${minMag}`;

  // console.log(url);

  const { data, isLoading, isError, error } = useQuery<IData, Error>(
    ['eqData', url],
    () => fetcher(url),
    config
  );

  useEffect(() => {
    // console.log(data);
    const extractedData = data?.features.map((feature) => {
      const {
        mag,
        place,
        time,
        updated,
        tz,
        alert,
        tsunami,
        detail,
      } = feature.properties;
      return {
        id: feature.id,
        mag,
        place,
        time,
        updated,
        tz,
        alert,
        tsunami,
        detail,
        coordinates: feature.geometry.coordinates,
      };
    });

    setEqData(extractedData);
  }, [data]);

  if (isLoading)
    return (
      <div>
        <CircularProgress />
        Data is Loading...
      </div>
    );

  if (isError) return <div>Error: {error.message}</div>;
  //if (error) return <div>{error.message}</div>;

  return (
    <div className={classes.root}>
      <SEO />
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
              {eqData && !isError ? (
                <EnhancedTable
                  eqData={eqData}
                  timeZone={timeZone}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                />
              ) : (
                <Typography variant="h6" color="error" align="center">
                  Loading Data falied. Please Try Again Later.
                </Typography>
              )}
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

//export const getServerSideProps: GetServerSideProps = async () => {
//export const getStaticProps: GetStaticProps = async () => {
//  const period = 3;
//  const minMag = 4;
//  const { starttime, endtime } = getStartEndTime(period);

//  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&minmagnitude=${minMag}`;

//  //export const getServerSideProps: GetServerSideProps = async () => {
//  await queryClient.prefetchQuery(['eqData', url], () => fetcher(url));
//  console.log('SSR');

//  return {
//    props: {
//      dehydratedState: dehydrate(queryClient),
//    },
//  };
//};
