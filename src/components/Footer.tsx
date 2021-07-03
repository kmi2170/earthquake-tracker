import { Typography, Grid } from '@material-ui/core';
const Footer = () => {
  const dt = new Date();
  const year = dt.getFullYear();

  return (
    <footer>
      <Typography variant="h6">
        Copyrihgt &copy; kmi {year} All rights reserved. | Earthquake date from
        USGC
      </Typography>
      {/* 
          <a href="https://earthquake.usgs.gov/" target="_blank">USGC</a>
      */}
    </footer>
  );
};

export default Footer;
