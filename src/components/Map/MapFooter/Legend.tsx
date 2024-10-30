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

      <Grid container justifyContent="center" alignItems="center" gap="0.75rem">
        {legends.map(({ label, color }) => {
          console.log({ label, color });
          return <MagIndex key={label} label={label} color={color} />;
        })}
      </Grid>
    </Box>
  );
};

export default Legend;

type MagIndexProps = {
  label: string;
  color: string;
};

const MagIndex = (props: MagIndexProps) => {
  const { label, color } = props;

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="0.25rem"
    >
      <Grid>
        <Box
          sx={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: color,
          }}
        ></Box>
      </Grid>
      <Typography variant="body1" component="span">
        {label}
      </Typography>
    </Grid>
  );
};
