/**
 * bookingUtils.test.js
 * Unit tests for the pure booking utility functions.
 * These run without React/DOM — fast and deterministic.
 */
import {
  initializeTimes,
  updateTimes,
  validateBookingForm,
} from '../utils/bookingUtils';

// ─────────────────────────────────────────
// initializeTimes
// ─────────────────────────────────────────
describe('initializeTimes', () => {
  test('returns an array', () => {
    expect(Array.isArray(initializeTimes())).toBe(true);
  });

  test('returns at least one time slot', () => {
    expect(initializeTimes().length).toBeGreaterThan(0);
  });

  test('every slot matches HH:MM format', () => {
    initializeTimes().forEach(slot => {
      expect(slot).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  test('includes an early-evening slot (17:00)', () => {
    expect(initializeTimes()).toContain('17:00');
  });

  test('includes a late-evening slot (22:00)', () => {
    expect(initializeTimes()).toContain('22:00');
  });
});

// ─────────────────────────────────────────
// updateTimes reducer
// ─────────────────────────────────────────
describe('updateTimes reducer', () => {
  test('returns same state for unknown action type', () => {
    const state = ['17:00', '18:00'];
    expect(updateTimes(state, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  test('UPDATE_TIMES returns an array', () => {
    const result = updateTimes([], { type: 'UPDATE_TIMES', date: '2025-12-01' });
    expect(Array.isArray(result)).toBe(true);
  });

  test('UPDATE_TIMES returns a non-empty array', () => {
    const result = updateTimes([], { type: 'UPDATE_TIMES', date: '2025-06-15' });
    expect(result.length).toBeGreaterThan(0);
  });

  test('does not mutate the original state array', () => {
    const original = ['17:00'];
    const frozen = Object.freeze([...original]);
    expect(() => updateTimes(frozen, { type: 'UNKNOWN' })).not.toThrow();
  });
});

// ─────────────────────────────────────────
// validateBookingForm
// ─────────────────────────────────────────
describe('validateBookingForm', () => {
  /** Helper: build a fully valid fields object */
  const validFields = () => ({
    date:     new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    time:     '19:00',
    guests:   '2',
    occasion: 'birthday',
    name:     'Eddie Torres',
    email:    'eddie@example.com',
    requests: '',
  });

  // ── Happy path ──
  test('returns empty errors object for a valid form', () => {
    expect(validateBookingForm(validFields())).toEqual({});
  });

  // ── Date field ──
  test('requires date', () => {
    const fields = { ...validFields(), date: '' };
    expect(validateBookingForm(fields).date).toBeTruthy();
  });

  test('rejects a past date', () => {
    const fields = { ...validFields(), date: '2000-01-01' };
    expect(validateBookingForm(fields).date).toBeTruthy();
  });

  test('accepts today as a valid date', () => {
    const today = new Date().toISOString().split('T')[0];
    const fields = { ...validFields(), date: today };
    expect(validateBookingForm(fields).date).toBeFalsy();
  });

  // ── Time field ──
  test('requires time', () => {
    const fields = { ...validFields(), time: '' };
    expect(validateBookingForm(fields).time).toBeTruthy();
  });

  // ── Guests field ──
  test('requires guests', () => {
    const fields = { ...validFields(), guests: '' };
    expect(validateBookingForm(fields).guests).toBeTruthy();
  });

  test('rejects 0 guests', () => {
    const fields = { ...validFields(), guests: '0' };
    expect(validateBookingForm(fields).guests).toBeTruthy();
  });

  test('rejects 11 guests', () => {
    const fields = { ...validFields(), guests: '11' };
    expect(validateBookingForm(fields).guests).toBeTruthy();
  });

  test('accepts 1 guest (boundary)', () => {
    const fields = { ...validFields(), guests: '1' };
    expect(validateBookingForm(fields).guests).toBeFalsy();
  });

  test('accepts 10 guests (boundary)', () => {
    const fields = { ...validFields(), guests: '10' };
    expect(validateBookingForm(fields).guests).toBeFalsy();
  });

  // ── Occasion field ──
  test('requires occasion', () => {
    const fields = { ...validFields(), occasion: '' };
    expect(validateBookingForm(fields).occasion).toBeTruthy();
  });

  // ── Name field ──
  test('requires name', () => {
    const fields = { ...validFields(), name: '' };
    expect(validateBookingForm(fields).name).toBeTruthy();
  });

  test('rejects whitespace-only name', () => {
    const fields = { ...validFields(), name: '   ' };
    expect(validateBookingForm(fields).name).toBeTruthy();
  });

  test('rejects single-character name', () => {
    const fields = { ...validFields(), name: 'X' };
    expect(validateBookingForm(fields).name).toBeTruthy();
  });

  test('accepts a two-character name', () => {
    const fields = { ...validFields(), name: 'Jo' };
    expect(validateBookingForm(fields).name).toBeFalsy();
  });

  // ── Email field ──
  test('requires email', () => {
    const fields = { ...validFields(), email: '' };
    expect(validateBookingForm(fields).email).toBeTruthy();
  });

  test('rejects email missing @', () => {
    const fields = { ...validFields(), email: 'notanemail' };
    expect(validateBookingForm(fields).email).toBeTruthy();
  });

  test('rejects email missing domain', () => {
    const fields = { ...validFields(), email: 'user@' };
    expect(validateBookingForm(fields).email).toBeTruthy();
  });

  test('accepts a well-formed email', () => {
    const fields = { ...validFields(), email: 'hello@little-lemon.com' };
    expect(validateBookingForm(fields).email).toBeFalsy();
  });

  // ── Multiple errors ──
  test('returns errors for every invalid field simultaneously', () => {
    const empty = {
      date: '', time: '', guests: '', occasion: '', name: '', email: '', requests: '',
    };
    const errors = validateBookingForm(empty);
    expect(Object.keys(errors).length).toBeGreaterThanOrEqual(5);
  });
});
