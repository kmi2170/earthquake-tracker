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

const user = userEvent.setup();
const setup = () =>
  render(
    <EqDataContextProvider>
      <Form />
    </EqDataContextProvider>
  );
type Setup = typeof setup;

describe('Form', () => {
  // beforeEach(() => {});
  afterEach(() => cleanup());

  describe('default select', () => {
    it('default period', () => {
      expect.assertions(1);
      defaultValue(setup, 0, '3 days');
    });
    it('default min. magnitude', () => {
      expect.assertions(1);
      defaultValue(setup, 1, '4.0');
    });
    it('default timezone', () => {
      expect.assertions(1);
      defaultValue(setup, 2, 'Local');
    });
  });

  describe('select period', () => {
    it.each(periods)('period: %s', async (text) => {
      expect.assertions(1);
      await clickOption(setup, user, 0, text);
    });
  });
  describe('select min. magnitude', () => {
    it.each(magnitudes)('min. magnitude: %s', async (text) => {
      expect.assertions(1);
      await clickOption(setup, user, 1, text);
    });
  });
  describe('select timezone', () => {
    it.each(timezones)('timezone: %s', async (text) => {
      expect.assertions(1);
      await clickOption(setup, user, 2, text);
    });
  });
});

const clickOption = async (
  setup: Setup,
  user: UserEvent,
  index: number,
  text: string
) => {
  setup();
  const btn = screen.getAllByRole('button');
  fireEvent.mouseDown(btn[index]);
  const listbox = within(screen.getByRole('listbox'));

  await user.click(listbox.getByText(text));
  expect(btn[index].textContent).toBe(text);
};

const defaultValue = (setup: Setup, index: number, text: string) => {
  setup();
  const btn = screen.getAllByRole('button');
  expect(btn[index].textContent).toBe(text);
};
