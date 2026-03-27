/**
 * BookingForm.js
 * Controlled booking form component.
 * Accepts availableTimes, onDateChange, and onSubmit as props
 * so it is fully testable without routing.
 *
 * Accessibility:
 *  - Every input has an associated <label> via htmlFor / id pair
 *  - Errors use role="alert" so screen readers announce them immediately
 *  - aria-invalid marks the field as invalid when an error exists
 *  - aria-describedby links hints and errors to their input
 *  - Required fields have aria-required="true"
 */
import { useState } from 'react';
import { validateBookingForm } from '../utils/bookingUtils';
import './BookingForm.css';

/** Default blank form state */
const INITIAL_FIELDS = {
  date: '',
  time: '',
  guests: '2',
  occasion: '',
  name: '',
  email: '',
  requests: '',
};

const OCCASIONS = ['Birthday', 'Anniversary', 'Date Night', 'Business Dinner', 'Other'];

function BookingForm({ availableTimes, onDateChange, onSubmit }) {
  const [fields, setFields]   = useState(INITIAL_FIELDS);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  /** Update a single field value and clear its error */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    // Clear error once the user starts correcting the field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Notify parent when date changes (triggers time-slot refresh)
    if (name === 'date' && onDateChange) {
      onDateChange(value);
    }
  };

  /** Mark field as touched on blur to show inline errors early */
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    // Validate just this field on blur
    const allErrors = validateBookingForm(fields);
    if (allErrors[name]) {
      setErrors(prev => ({ ...prev, [name]: allErrors[name] }));
    }
  };

  /** Full submission validation */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Mark every field as touched
    const allTouched = Object.keys(INITIAL_FIELDS).reduce(
      (acc, k) => ({ ...acc, [k]: true }), {}
    );
    setTouched(allTouched);

    const validationErrors = validateBookingForm(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Move focus to the first error field for accessibility
      const firstErrorId = Object.keys(validationErrors)[0];
      const firstEl = document.getElementById(firstErrorId);
      if (firstEl) firstEl.focus();
      return;
    }

    // Pass validated data up to the page
    if (onSubmit) onSubmit(fields);
  };

  /** Helper: show error only if field has been touched */
  const getError = (name) => (touched[name] || errors[name]) ? errors[name] : '';

  const today = new Date().toISOString().split('T')[0];

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Table reservation form"
      className="booking-form"
    >
      {/* ── Row 1: Date + Time ── */}
      <div className="form-row">

        {/* Date */}
        <div className="form-group">
          <label htmlFor="date">
            Reservation Date <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={fields.date}
            onChange={handleChange}
            onBlur={handleBlur}
            min={today}
            aria-required="true"
            aria-invalid={!!getError('date')}
            aria-describedby={getError('date') ? 'date-error' : undefined}
          />
          {getError('date') && (
            <span id="date-error" role="alert" className="form-error">
              {getError('date')}
            </span>
          )}
        </div>

        {/* Time */}
        <div className="form-group">
          <label htmlFor="time">
            Reservation Time <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <select
            id="time"
            name="time"
            value={fields.time}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!getError('time')}
            aria-describedby={getError('time') ? 'time-error' : undefined}
          >
            <option value="" disabled>Select a time</option>
            {availableTimes && availableTimes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {getError('time') && (
            <span id="time-error" role="alert" className="form-error">
              {getError('time')}
            </span>
          )}
        </div>

      </div>

      {/* ── Row 2: Guests + Occasion ── */}
      <div className="form-row">

        {/* Guests */}
        <div className="form-group">
          <label htmlFor="guests">
            Number of Guests <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            min="1"
            max="10"
            value={fields.guests}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!getError('guests')}
            aria-describedby="guests-hint guests-error"
          />
          <span id="guests-hint" className="form-hint">Between 1 and 10 guests</span>
          {getError('guests') && (
            <span id="guests-error" role="alert" className="form-error">
              {getError('guests')}
            </span>
          )}
        </div>

        {/* Occasion */}
        <div className="form-group">
          <label htmlFor="occasion">
            Occasion <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <select
            id="occasion"
            name="occasion"
            value={fields.occasion}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!getError('occasion')}
            aria-describedby={getError('occasion') ? 'occasion-error' : undefined}
          >
            <option value="" disabled>Select an occasion</option>
            {OCCASIONS.map(occ => (
              <option key={occ} value={occ.toLowerCase().replace(' ', '-')}>
                {occ}
              </option>
            ))}
          </select>
          {getError('occasion') && (
            <span id="occasion-error" role="alert" className="form-error">
              {getError('occasion')}
            </span>
          )}
        </div>

      </div>

      {/* ── Row 3: Name + Email ── */}
      <div className="form-row">

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">
            Your Name <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!getError('name')}
            aria-describedby={getError('name') ? 'name-error' : undefined}
            placeholder="Full name"
          />
          {getError('name') && (
            <span id="name-error" role="alert" className="form-error">
              {getError('name')}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">
            Email Address <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!getError('email')}
            aria-describedby={getError('email') ? 'email-error' : undefined}
            placeholder="you@example.com"
          />
          {getError('email') && (
            <span id="email-error" role="alert" className="form-error">
              {getError('email')}
            </span>
          )}
        </div>

      </div>

      {/* ── Special Requests (full width) ── */}
      <div className="form-group form-group--full">
        <label htmlFor="requests">
          Special Requests{' '}
          <span className="form-optional">(optional)</span>
        </label>
        <textarea
          id="requests"
          name="requests"
          rows="3"
          value={fields.requests}
          onChange={handleChange}
          aria-describedby="requests-hint"
          placeholder="Allergies, seating preferences, accessibility needs…"
        />
        <span id="requests-hint" className="form-hint">
          We'll do our best to accommodate you.
        </span>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary form-submit"
      >
        Confirm Reservation
      </button>

      <p className="form-required-note">
        <span aria-hidden="true">*</span> Required fields
      </p>
    </form>
  );
}

export default BookingForm;
