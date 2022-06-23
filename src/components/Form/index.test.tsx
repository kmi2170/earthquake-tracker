import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup';
import '@testing-library/jest-dom';

import Form from './index';
import { EqDataContextProvider } from '../../context';
import { mags, timePeriods, timeZones } from '../../constants';

const periods = timePeriods.map((item) => item.period);
const magnitudes = mags.map((item) => item.mag);
const timezones = timeZones.map((item) => item.tz);

describe('Form', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(
      <EqDataContextProvider>
        <Form />
      </EqDataContextProvider>
    );
  });
  afterEach(() => cleanup());

  describe('default select', () => {
    test('default period', () => defaultValue(0, '3 days'));
    test('default min. magnitude', () => defaultValue(1, '4.0'));
    test('default timezone', () => defaultValue(2, 'Local'));
  });

  describe('select period', () => {
    test.each(periods)('period: %s', async (period) => {
      await clickOption(user, 0, period);
    });
  });
  describe('select min. magnitude', () => {
    test.each(magnitudes)('min. magnitude: %s', async (period) => {
      await clickOption(user, 1, period);
    });
  });
  describe('select timezone', () => {
    test.each(timezones)('timezone: %s', async (period) => {
      await clickOption(user, 2, period);
    });
  });
});

const clickOption = async (user: UserEvent, index: number, text: string) => {
  const btn = screen.getAllByRole('button');
  fireEvent.mouseDown(btn[index]);
  const listbox = within(screen.getByRole('listbox'));

  await user.click(listbox.getByText(text));
  expect(btn[index].textContent).toBe(text);
};
const defaultValue = (index: number, text: string) => {
  const btn = screen.getAllByRole('button');
  expect(btn[index].textContent).toBe(text);
};
