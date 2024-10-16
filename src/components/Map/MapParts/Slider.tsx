import { memo } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { magColor } from '../../../constants';

type RadiusSliderProps = {
  value: number;
  changeValue: (value: number) => void;
};

const RadiusSlider = (props: RadiusSliderProps) => {
  const { value, changeValue } = props;

  const handleChange = (event: Event, newValue: number | number[]) => {
    changeValue(newValue as number);
  };

  const dotColor = magColor(4);

  return (
    <Box
      sx={{
        marginTop: 3,
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
      }}
    >
      <Dot color={dotColor} size="3rem" />
      <Slider
        max={1}
        min={0.1}
        step={0.1}
        aria-label="radius"
        value={value}
        onChange={handleChange}
        sx={{ width: 250 }}
      />
      <Dot color={dotColor} size="8rem" />
    </Box>
  );
};

export default memo(RadiusSlider);

const Dot = ({ color, size }: { color: string; size: string }) => {
  return (
    <Box
      sx={{
        color,
        margin: '0.5rem 0.5rem 0 0.5rem',
      }}
    >
      <Typography
        variant="body2"
        component="span"
        sx={{
          fontSize: size,
        }}
      >
        •
      </Typography>
    </Box>
  );
};
