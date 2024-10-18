import { memo } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { magnitudeColor } from '../../../constants';

type RadiusSliderProps = {
  value: number;
  changeValue: (value: number) => void;
};

const RadiusSlider = (props: RadiusSliderProps) => {
  const { value, changeValue } = props;

  const handleChange = (event: Event, newValue: number | number[]) => {
    changeValue(newValue as number);
  };

  const dotColor = magnitudeColor(4);

  return (
    <Box
      sx={{
        marginTop: 1,
        marginBottom: 1,
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
        aria-label="radius"
        value={value}
        onChange={handleChange}
        sx={{ width: 250 }}
      />
      <MemoizedDot color={dotColor} fontSize={7} marginBottom={0.75} />
    </Box>
  );
};

export default memo(RadiusSlider);

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
