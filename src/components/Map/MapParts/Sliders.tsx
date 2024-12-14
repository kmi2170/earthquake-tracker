import { memo } from 'react';

import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { magnitudeColor, magnitudeMarks } from '../../../constants';

type Sliders = {
  circleRadius: number;
  changeCircleRadius: (value: number) => void;
  initialMinMagnitude: number;
  minMagnitude: number;
  changeMinMagnitude: (value: number) => void;
  initialMaxMagnitude: number;
  maxMagnitude: number;
  changeMaxMagnitude: (value: number) => void;
};

const Sliders = (props: Sliders) => {
  const {
    circleRadius,
    changeCircleRadius: changeCircleRadius,
    initialMinMagnitude,
    minMagnitude,
    changeMinMagnitude,
    initialMaxMagnitude,
    maxMagnitude,
    changeMaxMagnitude,
  } = props;

  const handleCircularRadiusChange = (event: Event, newValue: number) => {
    changeCircleRadius(newValue);
  };

  const handleMagnitudeChange = (event: Event, newValue: number[]) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] >= 1) {
      changeMinMagnitude(newValue[0]);
      changeMaxMagnitude(newValue[1]);
    }
  };

  const dotColor = magnitudeColor(3);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '1rem',
        marginBottom: '2rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px',
        }}
      >
        <Typography variant="subtitle2">Circle Radius</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30px',
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
        <Typography variant="subtitle2" sx={{ marginLeft: '1.5rem' }}>
          Magnitude Range
        </Typography>
        <Slider
          min={initialMinMagnitude}
          max={initialMaxMagnitude}
          step={1}
          aria-label="magnitude-range"
          valueLabelDisplay="auto"
          marks={magnitudeMarks}
          value={[minMagnitude, maxMagnitude]}
          onChange={handleMagnitudeChange}
          color="secondary"
          sx={{ width: 200 }}
          defaultValue={50}
          disableSwap
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
