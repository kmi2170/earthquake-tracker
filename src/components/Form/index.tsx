'use client';
import { memo } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MenuProps, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { mags, timePeriods, timeZones } from '../../constants';
import { useEqData } from '../../context/useEqData';

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
          Last
        </InputLabel>
        <Select
          labelId="period-label"
          id="period-select"
          value={period}
          label="Last"
          onChange={(e) => setPeriod(e.target.value as number)}
          defaultValue={initialPeriod}
          MenuProps={menuProps}
        >
          {timePeriods.map(
            ({ period, value }: { period: string; value: number }) => (
              <MenuItem key={period} value={value}>
                {period}
              </MenuItem>
            ),
          )}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="minmag-label" shrink>
          Min. Mag.
        </InputLabel>
        <Select
          labelId="minmag-label"
          id="minmag-select"
          value={minMag}
          label="Min Mag."
          onChange={(e) => setMinMag(e.target.value as number)}
          defaultValue={initialMinMag}
          MenuProps={menuProps}
        >
          {mags.map(({ mag, value }: { mag: string; value: number }) => (
            <MenuItem key={mag} value={value}>
              {mag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="timezone-label" shrink>
          Time Zone
        </InputLabel>
        <Select
          labelId="timezone-label"
          id="timezone-select"
          value={timeZone}
          label="Time Zone"
          onChange={(e) => setTimeZone(e.target.value)}
          defaultValue={'local'}
          MenuProps={menuProps}
        >
          {timeZones.map(({ tz, value }: { tz: string; value: string }) => (
            <MenuItem key={tz} value={value}>
              {tz}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default memo(SelectForm);
