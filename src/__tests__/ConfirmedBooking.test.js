/**
 * ConfirmedBooking.test.js
 * Tests for the booking confirmation page.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ConfirmedBooking from '../pages/ConfirmedBooking';

/** Render with router state */
const renderWithState = (state = null) =>
  render(
    <MemoryRouter
      initialEntries={[{ pathname: '/confirmed', state }]}
    >
      <Routes>
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </MemoryRouter>
  );

const SAMPLE_BOOKING = {
  date:     '2026-06-20',
  time:     '19:00',
  guests:   '3',
  occasion: 'birthday',
  name:     'Eddie Torres',
  email:    'eddie@example.com',
  requests: 'Window seat please',
};

describe('ConfirmedBooking', () => {
  test('renders confirmation heading when booking data present', () => {
    renderWithState({ booking: SAMPLE_BOOKING });
    expect(
      screen.getByRole('heading', { name: /booking confirmed/i })
    ).toBeInTheDocument();
  });

  test("shows the guest's name", () => {
    renderWithState({ booking: SAMPLE_BOOKING });
    expect(screen.getByText(/Eddie Torres/i)).toBeInTheDocument();
  });

  test('shows the reservation date', () => {
    renderWithState({ booking: SAMPLE_BOOKING });
    expect(screen.getByText('2026-06-20')).toBeInTheDocument();
  });

  test('shows the reservation time', () => {
    renderWithState({ booking: SAMPLE_BOOKING });
    expect(screen.getByText('19:00')).toBeInTheDocument();
  });

  test('shows the guest email', () => {
    renderWithState({ booking: SAMPLE_BOOKING });
    expect(screen.getByText(/eddie@example.com/i)).toBeInTheDocument();
  });

  test('shows special requests when provided', () => {
    renderWithState({ booking: SAMPLE_BOOKING });
    expect(screen.getByText(/window seat/i)).toBeInTheDocument();
  });

  test('renders "Back to Home" link', () => {
    renderWithState({ booking: SAMPLE_BOOKING });
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument();
  });

  test('renders fallback when no booking data', () => {
    renderWithState(null);
    expect(screen.getByRole('heading', { name: /no booking found/i })).toBeInTheDocument();
  });

  test('fallback includes link to booking form', () => {
    renderWithState(null);
    expect(
      screen.getByRole('link', { name: /make a reservation/i })
    ).toBeInTheDocument();
  });

  test('page has aria-live="polite" for screen reader announcement', () => {
    const { container } = renderWithState({ booking: SAMPLE_BOOKING });
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });
});
