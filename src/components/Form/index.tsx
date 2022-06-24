import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Theme,
  MenuProps,
} from '@material-ui/core';

import { mags, timePeriods, timeZones } from '../../constants';
import { useEqData } from '../../context/hook';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const menuProps: Partial<MenuProps> = {
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
};

const SelectForm = () => {
  const classes = useStyles();

  const {
    initialPeriod,
    period,
    setPeriod,
    initialMinMag,
    minMag,
    setMinMag,
    timeZone,
    setTimeZone,
  } = useEqData();

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel id="period-label" shrink>
          <Typography variant="h6" align="center">
            Last
          </Typography>
        </InputLabel>
        <Select
          labelId="period-label"
          id="period-select"
          value={period}
          onChange={(e) => setPeriod(e.target.value as number)}
          defaultValue={initialPeriod}
          MenuProps={menuProps}
        >
          {timePeriods.map(
            ({ period, value }: { period: string; value: number }) => (
              <MenuItem key={period} value={value}>
                <Typography variant="subtitle1" align="center">
                  {period}
                </Typography>
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="minmag-label" shrink>
          <Typography variant="h6" align="center">
            Min. Mag.
          </Typography>
        </InputLabel>
        <Select
          labelId="minmag-label"
          id="minmag-select"
          value={minMag}
          onChange={(e) => setMinMag(e.target.value as number)}
          defaultValue={initialMinMag}
          MenuProps={menuProps}
        >
          {mags.map(({ mag, value }: { mag: string; value: number }) => (
            <MenuItem key={mag} value={value}>
              <Typography variant="subtitle1" align="center">
                {mag}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="timezone-label" shrink>
          <Typography variant="h6" align="center">
            Time
          </Typography>
        </InputLabel>
        <Select
          labelId="timezone-label"
          id="timezone-select"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value as string)}
          defaultValue={'local'}
          MenuProps={menuProps}
        >
          {timeZones.map(({ tz, value }: { tz: string; value: string }) => (
            <MenuItem key={tz} value={value}>
              <Typography variant="subtitle1" align="center">
                {tz}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default memo(SelectForm);
