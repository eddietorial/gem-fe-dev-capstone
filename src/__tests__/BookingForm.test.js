/**
 * BookingForm.test.js
 * Integration tests for the BookingForm UI component.
 * Covers rendering, accessibility attributes, validation flow,
 * and callback invocation.
 */
import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../components/BookingForm';

/** Default prop: a fixed list of time slots */
const MOCK_TIMES = ['17:00', '18:00', '19:00', '20:00'];

/** Helper to render with sensible defaults */
const renderForm = (props = {}) =>
  render(
    <BookingForm
      availableTimes={MOCK_TIMES}
      onDateChange={jest.fn()}
      onSubmit={jest.fn()}
      {...props}
    />
  );

// ─────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────
describe('BookingForm – rendering', () => {
  test('renders the form element with accessible label', () => {
    renderForm();
    expect(screen.getByRole('form', { name: /table reservation/i })).toBeInTheDocument();
  });

  test('renders the date input', () => {
    renderForm();
    expect(screen.getByLabelText(/reservation date/i)).toBeInTheDocument();
  });

  test('renders the time select', () => {
    renderForm();
    expect(screen.getByLabelText(/reservation time/i)).toBeInTheDocument();
  });

  test('renders the guests input', () => {
    renderForm();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  });

  test('renders the occasion select', () => {
    renderForm();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
  });

  test('renders the name input', () => {
    renderForm();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
  });

  test('renders the email input', () => {
    renderForm();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  test('renders special requests textarea', () => {
    renderForm();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
  });

  test('renders the submit button', () => {
    renderForm();
    expect(
      screen.getByRole('button', { name: /confirm reservation/i })
    ).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────
// Accessibility attributes
// ─────────────────────────────────────────
describe('BookingForm – accessibility', () => {
  test('date input has aria-required="true"', () => {
    renderForm();
    expect(screen.getByLabelText(/reservation date/i)).toHaveAttribute('aria-required', 'true');
  });

  test('time select has aria-required="true"', () => {
    renderForm();
    expect(screen.getByLabelText(/reservation time/i)).toHaveAttribute('aria-required', 'true');
  });

  test('name input has aria-required="true"', () => {
    renderForm();
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-required', 'true');
  });

  test('email input has aria-required="true"', () => {
    renderForm();
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute('aria-required', 'true');
  });

  test('guests input has min="1" and max="10"', () => {
    renderForm();
    const input = screen.getByLabelText(/number of guests/i);
    expect(input).toHaveAttribute('min', '1');
    expect(input).toHaveAttribute('max', '10');
  });

  test('guests input has aria-describedby pointing to hint', () => {
    renderForm();
    const input = screen.getByLabelText(/number of guests/i);
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
  });

  test('form has noValidate to delegate validation to JS', () => {
    renderForm();
    expect(screen.getByRole('form', { name: /table reservation/i })).toHaveAttribute('noValidate');
  });
});

// ─────────────────────────────────────────
// Available times
// ─────────────────────────────────────────
describe('BookingForm – available times', () => {
  test('renders the correct number of time options', () => {
    renderForm();
    const select = screen.getByLabelText(/reservation time/i);
    // +1 for the placeholder option
    expect(select.options.length).toBe(MOCK_TIMES.length + 1);
  });

  test('renders each time slot as an option', () => {
    renderForm();
    MOCK_TIMES.forEach(t => {
      expect(screen.getByRole('option', { name: t })).toBeInTheDocument();
    });
  });

  test('has a placeholder option with empty value', () => {
    renderForm();
    expect(screen.getByRole('option', { name: /select a time/i })).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────
// Validation – error messages
// ─────────────────────────────────────────
describe('BookingForm – validation on submit', () => {
  test('shows date error when date is empty', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));
    await waitFor(() => {
      expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
    });
  });

  test('shows time error when no time selected', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));
    await waitFor(() => {
      expect(screen.getByText(/please choose a time/i)).toBeInTheDocument();
    });
  });

  test('shows name error when name is empty', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));
    await waitFor(() => {
      expect(screen.getByText(/your name is required/i)).toBeInTheDocument();
    });
  });

  test('shows email error when email is empty', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));
    await waitFor(() => {
      expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
    });
  });

  test('shows error for invalid email format', async () => {
    renderForm();
    const emailInput = screen.getByLabelText(/email address/i);
    await userEvent.type(emailInput, 'bad-email');
    fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  test('error messages have role="alert"', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));
    await waitFor(() => {
      const alerts = screen.getAllByRole('alert');
      expect(alerts.length).toBeGreaterThan(0);
    });
  });

  test('invalid field gets aria-invalid="true"', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));
    await waitFor(() => {
      expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-invalid', 'true');
    });
  });
});

// ─────────────────────────────────────────
// Callbacks
// ─────────────────────────────────────────
describe('BookingForm – callbacks', () => {
  test('calls onDateChange when date changes', async () => {
    const onDateChange = jest.fn();
    renderForm({ onDateChange });
    const dateInput = screen.getByLabelText(/reservation date/i);
    fireEvent.change(dateInput, { target: { value: '2026-06-15' } });
    expect(onDateChange).toHaveBeenCalledWith('2026-06-15');
  });

  test('does NOT call onSubmit when form is invalid', async () => {
    const onSubmit = jest.fn();
    renderForm({ onSubmit });
    fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));
    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
