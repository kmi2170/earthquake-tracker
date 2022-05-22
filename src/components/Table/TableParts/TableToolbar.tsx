import { Grid, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
