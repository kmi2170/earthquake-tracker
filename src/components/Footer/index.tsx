import { memo } from 'react';
import { Typography } from '@mui/material';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Typography variant="h6">
        &copy; {year} Kemmei H. | Earthquake date by USGC
      </Typography>
    </footer>
  );
};

export default memo(Footer);
