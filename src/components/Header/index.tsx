import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Form from '../Form';

const Header = () => {
  return (
    <Grid
      container
      sx={{
        marginTop: '1rem',
        marginBottom: '2rem',
      }}
    >
      <Grid
        size={{ xs: 12, sm: 6 }}
        sx={{
          mt: 3,
        }}
      >
        <Typography variant="h3" component="h1" align="center">
          Earthquake Tracker
        </Typography>
      </Grid>
      <Grid
        size={{ xs: 12, sm: 6 }}
        sx={{
          mt: 2,
        }}
      >
        <Form />
      </Grid>
    </Grid>
  );
};

export default Header;
