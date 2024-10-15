import * as React from 'react';
import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

type RadiusSliderProps = {
  value: number;
  changeValue: (value: number) => void;
};

const RadiusSlider = (props: RadiusSliderProps) => {
  const { value, changeValue } = props;

  const handleChange = (event: Event, newValue: number | number[]) => {
    //const handleChange = (event: Event, newValue: number | number[]) => {
    changeValue(newValue as number);
  };

  return (
    <Box
      sx={{
        marginTop: 5,
        marginBottom: 5,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: 300 }}>
        {/* <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center"> */}
        <Slider
          max={1}
          min={0.1}
          step={0.1}
          aria-label="radius"
          value={value}
          onChange={handleChange}
        />
        {/* </Stack> */}
      </Box>
    </Box>
  );
};

export default React.memo(RadiusSlider);
