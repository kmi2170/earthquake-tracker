import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Legend from './Legend';

const user = userEvent.setup();
const setup = () => render(<Legend />);
const popupMessage = 'Hover over a circle for the detailed info';

describe('Legend', () => {
  setup();
  const legend = screen.getByText('LEGEND');
  it(`hover over Legend and appear a popup with the message: ${popupMessage}`, async () => {
    await user.hover(legend);
    expect(screen.getByText(popupMessage)).toBeInTheDocument();
  });
  it(`unhover over Legend and disappear a popup`, async () => {
    await user.unhover(legend);
    expect(screen.queryByText(popupMessage)).not.toBeInTheDocument();
  });
});
