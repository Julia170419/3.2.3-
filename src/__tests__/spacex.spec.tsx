import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeAll, vi, beforeEach } from 'vitest';
import ky from 'ky';
import { MantineProvider } from '@mantine/core';
import App from '../App';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

vi.mock('ky', () => ({
    default: {
        get: vi.fn(),
    },
}));

const mockSpaceX = {
  launches: [
    { 
      flight_number: 1, 
      mission_name: 'FalconSat', 
      links: { mission_patch_small: 'https://img1.png', mission_patch: 'https://img1-big.png' }, 
      rocket: { rocket_name: 'Falcon 1' }, 
      details: 'Engine failure at 33 seconds' 
    },
    { 
      flight_number: 2, 
      mission_name: 'DemoSat',
      rocket: { rocket_name: 'Falcon 1' }, 
      details: 'Successful first stage burn' 
    },
    { 
      flight_number: 3, 
      mission_name: 'Trailblazer', 
      links: { mission_patch_small: 'https://img3.png', mission_patch: 'https://img3-big.png' },
      details: 'Residual stage 1 thrust' 
    },
  ]
};

const renderApp = () => {
  if (!document.getElementById('modal')) {
        const modal = document.createElement('div');
        modal.setAttribute('id', 'modal');
        document.body.appendChild(modal);
    }
    return render(
        <MantineProvider>
                <App />
        </MantineProvider>
  );
};

describe('SpaceX', () => {
  beforeEach(() => {
        cleanup();
        vi.clearAllMocks();
        vi.mocked(ky.get).mockReturnValueOnce({
                json: vi.fn(() => Promise.resolve(mockSpaceX)),
            } as any)
            renderApp();
    })
    describe('Main', () => {
      it('Check the quantity of cards', async () => {
            const spaceX = await screen.findAllByTestId('card');
            expect(spaceX).toHaveLength(3);
        })
    })
    describe('Modal', () => {
      it('Open Modal', async () => {
            const user = userEvent.setup();
            const buttons = await screen.findAllByRole('button', { name: /see more/i });
            await user.click(buttons[0]);
            const modalDetailsLabel = await screen.findByText(/Details:/i);
            expect(modalDetailsLabel).toBeInTheDocument();
            const modalDescription = await screen.findByText(/Engine failure at 33 seconds/i);
            expect(modalDescription).toBeInTheDocument();
        })
      it('Close Modal', async () => {
            const user = userEvent.setup();
            const buttons = await screen.findAllByRole('button', { name: /see more/i });
            await user.click(buttons[0]);
            const modalDetailsLabel = await screen.findByText(/Details:/i);
            expect(modalDetailsLabel).toBeInTheDocument();
            const closeButton = screen.getByRole('button', { name: /close/i });
            await user.click(closeButton);
            await waitFor(() => {
              expect(screen.queryByText(/Details:/i)).not.toBeInTheDocument();
            });
        })
    })
})