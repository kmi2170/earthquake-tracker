import { memo } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { magnitudeColor, magnitudeMarks } from '../../../constants';

type Sliders = {
  circleRadius: number;
  changeCircleRadius: (value: number) => void;
  minMagnitude: number;
  changeMinMagnitude: (value: number) => void;
};

const Sliders = (props: Sliders) => {
  const {
    circleRadius,
    changeCircleRadius: changeCircleRadius,
    minMagnitude,
    changeMinMagnitude,
  } = props;

  const handleCircularRadiusChange = (
    event: Event,
    newValue: number | number[],
  ) => {
    changeCircleRadius(newValue as number);
  };

  const handleMinMagnitudeChange = (
    event: Event,
    newValue: number | number[],
  ) => {
    changeMinMagnitude(newValue as number);
  };

  const dotColor = magnitudeColor(3);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
        marginBottom: '2rem',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ marginRight: '0rem', marginBottom: '-0.95rem' }}
      >
        Circle Radius
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px',
        }}
      >
        <MemoizedDot color={dotColor} fontSize={2} marginBottom={0.25} />
        <Slider
          max={1}
          min={0.1}
          step={0.1}
          aria-label="circle-radius"
          value={circleRadius}
          onChange={handleCircularRadiusChange}
          sx={{ width: 200 }}
        />
        <MemoizedDot color={dotColor} fontSize={7} marginBottom={0.75} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px',
          marginLeft: '-2rem',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ marginLeft: '2rem', marginBottom: '-0.25rem' }}
        >
          Min. Magnitude
        </Typography>
        <Slider
          max={7}
          min={3}
          step={1}
          aria-label="min-magnitude"
          valueLabelDisplay="auto"
          marks={magnitudeMarks}
          value={minMagnitude}
          onChange={handleMinMagnitudeChange}
          color="secondary"
          sx={{ width: 200 }}
        />
      </Box>
    </Box>
  );
};

export default memo(Sliders);

const Dot = ({
  color = 'black',
  fontSize = 2,
  marginBottom = 0,
}: {
  color: string;
  fontSize: number;
  marginBottom?: number;
}) => {
  return (
    <Box
      sx={{
        color,
        marginLeft: '0.75rem',
        marginRight: '0.5rem',
        marginBottom: `${marginBottom}rem`,
      }}
    >
      <Typography
        variant="body2"
        component="span"
        sx={{
          fontSize: `${fontSize}rem`,
        }}
      >
        •
      </Typography>
    </Box>
  );
};

const MemoizedDot = memo(Dot);
