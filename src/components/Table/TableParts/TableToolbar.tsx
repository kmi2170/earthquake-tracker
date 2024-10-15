import { Grid, Toolbar, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useToolbarStyles = makeStyles(() => ({
  root: {},
  title: {
    flex: '1 1 100%',
  },
}));

const TableToolbar = ({ rowCount }: { rowCount: number }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {rowCount} Earthquakes
          </Typography>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default TableToolbar;
