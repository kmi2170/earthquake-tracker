import { Typography } from '@mui/material';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Typography variant="h6" component="footer" sx={{ marginTop: '1.5rem' }}>
      &copy; {year} Kemmei Hamada | Earthquake data by USGC
    </Typography>
  );
};

export default Footer;
