import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    >
      <CircularProgress
        color="secondary"
        size={100}
        thickness={8}
        sx={{ fontSize: '8rem' }}
      />
    </Box>
  );
};

export default LoadingSpinner;
