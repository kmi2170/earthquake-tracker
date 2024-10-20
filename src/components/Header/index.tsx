import Box from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Form from '../Form';

const Header = () => {
  return (
    <Box
      sx={{
        marginTop: '2rem',
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        size={{ xs: 12 }}
        sx={{
          mt: 0,
        }}
      >
        <Typography variant="h3" component="h1" align="center">
          Earthquake Tracker
        </Typography>
      </Box>
      <Box
        size={{ xs: 12 }}
        sx={{
          mt: 3,
        }}
      >
        <Form />
      </Box>
    </Box>
  );
};

export default Header;
