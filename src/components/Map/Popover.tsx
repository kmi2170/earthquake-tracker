import { useState } from 'react';
import { Popover, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FiberManualRecord as FiberManualRecordIcon } from '@material-ui/icons';
import { magColor, legends } from '../../constants';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1.5),
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: '10px',
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
    // flexDirection: 'column',
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

export default function MouseOverPopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={classes.legend}
      >
        LEGEND
      </Typography>
      {/* 
      <Button
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="outlined"
        size="small"
        color="secondary"
      >
        Legend
      </Button>
      */}
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
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
          Hover over a circle
        </Typography>
        <Typography variant="h6" style={{ paddingLeft: '0.5rem' }}>
          {' '}
          e to view the detail
        </Typography>
        {legends.map(
          ({ scale, className }: { scale: string; className: string }) => (
            <div key={className} className={classes.wrapper}>
              <section className={classes.icon}>
                <FiberManualRecordIcon className={classes[className]} />
              </section>

              <section className={classes.scale}>
                <Typography variant="h6" className={classes.scale}>
                  {scale}
                </Typography>
              </section>
            </div>
          ),
        )}
      </Popover>
    </div>
  );
}
