import { Typography, Grid } from '@material-ui/core';
const Footer = () => {
  const dt = new Date();
  const year = dt.getFullYear();

  return (
    <footer>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body2">
            Copyrihgt &copy; kmi {year} All rights reserved. | Earthquake date
            from USGC
          </Typography>
          {/* 
          <a href="https://earthquake.usgs.gov/" target="_blank">USGC</a>
      */}
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
