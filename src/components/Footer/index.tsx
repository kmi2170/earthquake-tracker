import { memo } from 'react';
import { Typography } from '@material-ui/core';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Typography variant="h6">
        &copy; Kemmei H. {year} All rights reserved. | Earthquake date from USGC
      </Typography>
    </footer>
  );
};

// export default Footer;
export default memo(Footer);
