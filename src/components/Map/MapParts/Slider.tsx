import * as React from 'react';
import Box from '@material-ui/core/Box';
// import Stack from '@material-ui/core/Stack';
import Slider from '@material-ui/core/Slider';

type RadiusSliderProps = {
  value: number;
  changeValue: (value: number) => void;
};

export default function RadiusSlider(props: RadiusSliderProps) {
  const { value, changeValue } = props;

  const handleChange = (
    event: React.ChangeEvent,
    newValue: number | number[],
  ) => {
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
}
