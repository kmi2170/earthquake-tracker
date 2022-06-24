import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Legend from './Legend';

const user = userEvent.setup();
const setup = () => render(<Legend />);
const message = 'Hover over a circle for the detailed info';

describe('Hover over Legend', () => {
  it(`Display popup with message: ${message}`, async () => {
    setup();
    const legend = screen.getByText('LEGEND');
    await user.hover(legend);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
