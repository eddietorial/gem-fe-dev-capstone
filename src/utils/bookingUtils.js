/**
 * bookingUtils.js
 * Pure helper functions for the Little Lemon booking system.
 * Kept separate from React so they can be unit-tested without a DOM.
 *
 * In a production app, fetchAvailableTimes() would call a real API.
 * For the capstone, it returns a fixed set of evening slots.
 */

/**
 * Returns the default set of available reservation times.
 * @returns {string[]} Array of time strings in "HH:MM" format
 */
export function initializeTimes() {
  return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
}

/**
 * Reducer for available booking times.
 * Dispatching UPDATE_TIMES re-evaluates slots for the selected date.
 *
 * @param {string[]} state  - Current list of available times
 * @param {{ type: string, date?: string }} action
 * @returns {string[]}
 */
export function updateTimes(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES':
      // TODO: replace with API call using action.date when backend is ready
      return initializeTimes();
    default:
      return state;
  }
}

/**
 * Validates every field in the booking form.
 *
 * @param {{ date: string, time: string, guests: string,
 *           occasion: string, name: string, email: string }} fields
 * @returns {{ [key: string]: string }} Object of field → error message (empty if valid)
 */
export function validateBookingForm(fields) {
  const errors = {};
  const today = new Date().toISOString().split('T')[0];

  // Date
  if (!fields.date) {
    errors.date = 'Please select a date.';
  } else if (fields.date < today) {
    errors.date = 'Date must be today or in the future.';
  }

  // Time
  if (!fields.time) {
    errors.time = 'Please choose a time slot.';
  }

  // Guests
  const guestCount = Number(fields.guests);
  if (!fields.guests) {
    errors.guests = 'Number of guests is required.';
  } else if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10) {
    errors.guests = 'Party size must be between 1 and 10.';
  }

  // Occasion
  if (!fields.occasion) {
    errors.occasion = 'Please select an occasion.';
  }

  // Name
  if (!fields.name || !fields.name.trim()) {
    errors.name = 'Your name is required.';
  } else if (fields.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!fields.email || !fields.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  return errors;
}
