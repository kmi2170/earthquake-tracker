import { memo, useCallback, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { FiberManualRecord as FiberManualRecordIcon } from '@mui/icons-material';

import { magColor, legends, LegendClass } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1.5),
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: '10px',
    maxWidth: '200px',
  },
  legend: {
    padding: '0 0.3rem',
    marginBottom: '0.1rem',
    borderRadius: '5px',
    borderStyle: 'solid',
    borderColor: 'grey',
    backgroundColor: 'grey',
    color: 'white',
    fontStyle: 'bold',
    fontSize: '.85rem',
  },
  magS: {
    color: magColor(4.0),
    fontSize: '1.5rem',
    alignItems: 'center',
  },
  magM: {
    color: magColor(5.5),
    fontSize: '1.5rem',
    alignItems: 'center',
  },
  magL: {
    color: magColor(6.5),
    fontSize: '1.5rem',
    alignItems: 'center',
  },
  magX: {
    color: magColor(7.5),
    fontSize: '1.5rem',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: '30&',
    paddingLeft: '0.5rem',
  },
  scale: {
    width: '70&',
    paddingLeft: '0.5rem',
    paddingBottom: '0.15rem',
  },
}));

const Legend = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null
  );

  const handlePopoverOpen = useCallback((e: React.SyntheticEvent) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <Typography
        aria-owns={!anchorEl ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={classes.legend}
      >
        LEGEND
      </Typography>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography variant="h6" style={{ paddingLeft: '0.5rem' }}>
          Hover over a circle for the detailed info
        </Typography>

        {legends.map(
          ({ scale, className }: { scale: string; className: LegendClass }) => (
            <div key={className} className={classes.wrapper}>
              <div className={classes.icon}>
                <span className={classes[className]}>
                  <FiberManualRecordIcon />
                </span>
              </div>

              <div className={classes.scale}>
                <Typography variant="h6" className={classes.scale}>
                  {scale}
                </Typography>
              </div>
            </div>
          )
        )}
      </Popover>
    </div>
  );
};

export default memo(Legend);
