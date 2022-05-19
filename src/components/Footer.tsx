import { Typography } from '@material-ui/core';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Typography variant="h6">
        Copyrihgt &copy; kmi {year} All rights reserved. | Earthquake date from
        USGC
      </Typography>
    </footer>
  );
};

export default Footer;
