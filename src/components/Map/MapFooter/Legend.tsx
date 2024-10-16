import { memo } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';

import { legends } from '../../../constants';

const useStyles = makeStyles(() => ({
  legend: {
    marginBottom: '0.5rem',
  },
  box: {
    width: '50px',
    height: '20px',
  },
}));

const Legend = () => {
  const classes = useStyles();

  return (
    <div className={classes.legend}>
      <Typography
        align="center"
        variant="subtitle2"
        component="h3"
        gutterBottom
      >
        Magnitude
      </Typography>

      <Grid container>
        {legends.map(({ mag, color }) => {
          return (
            <Grid key={mag}>
              <Box
                className={classes.box}
                sx={{ backgroundColor: color }}
              ></Box>
            </Grid>
          );
        })}
      </Grid>
      <Grid container>
        {legends.map(({ mag }) => {
          return (
            <Grid key={mag}>
              <Box className={classes.box}>
                <Typography
                  align="left"
                  variant="body1"
                  marginLeft="-4px"
                  sx={{ color: mag === 4 ? 'white' : 'black' }}
                >
                  {mag}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default memo(Legend);
