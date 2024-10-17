import { memo } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

import { legends } from '../../../constants';

const Legend = () => {
  return (
    <Box sx={{ marginBottom: '2rem' }}>
      <Typography
        align="center"
        variant="subtitle2"
        component="p"
        gutterBottom
        sx={{ fontSize: '1.25rem' }}
      >
        Magnitude
      </Typography>

      <Grid container>
        {legends.map(({ mag, color }) => {
          return (
            <Grid key={mag}>
              <Box
                sx={{
                  width: '50px',
                  height: '20px',
                  backgroundColor: color,
                }}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container>
        {legends.map(({ mag }) => {
          return (
            <Grid key={mag}>
              <Box
                sx={{
                  width: '50px',
                  height: '20px',
                }}
              >
                <Typography
                  align="left"
                  variant="body1"
                  component="span"
                  marginLeft="-4px"
                  sx={{
                    color: mag === 4 ? 'white' : 'black',
                    fontSize: '1.25rem',
                  }}
                >
                  {mag}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default memo(Legend);
