/**
 * ConfirmedBooking.js
 * Route: /confirmed
 *
 * Displays a booking confirmation summary.
 * Uses aria-live="polite" so screen readers announce the content
 * after navigation without being intrusive.
 *
 * If the page is accessed directly (no booking state), it shows a
 * graceful fallback with a link back to the booking form.
 */
import { useLocation, Link } from 'react-router-dom';
import './ConfirmedBooking.css';

/** Map internal values back to display-friendly labels */
const OCCASION_LABELS = {
  birthday:    'Birthday',
  anniversary: 'Anniversary',
  'date-night': 'Date Night',
  'business-dinner': 'Business Dinner',
  other:       'Other',
};

function ConfirmedBooking() {
  const { state } = useLocation();
  const booking   = state?.booking;

  /* ── Fallback: navigated here without booking data ── */
  if (!booking) {
    return (
      <section
        className="section container confirmed-fallback"
        aria-labelledby="confirmed-heading"
      >
        <div className="confirmed-empty">
          <p className="confirmed-empty-icon" aria-hidden="true">📋</p>
          <h1 id="confirmed-heading">No booking found</h1>
          <p>It looks like you arrived here without completing a reservation.</p>
          <Link to="/booking" className="btn btn-primary">
            Make a Reservation
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className="section confirmed-page"
      aria-labelledby="confirmed-heading"
      aria-live="polite"
    >
      <div className="container">
        <article className="confirmed-card" role="region" aria-label="Booking confirmation details">

          {/* Success icon */}
          <div className="confirmed-checkmark" aria-hidden="true">
            <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="26" cy="26" r="25" stroke="#495E57" strokeWidth="2" />
              <path d="M14 27l8 8 16-18" stroke="#495E57" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 id="confirmed-heading" className="confirmed-heading">
            Booking Confirmed!
          </h1>
          <p className="confirmed-intro">
            Thank you, <strong>{booking.name}</strong>. We look forward to welcoming you
            at Little Lemon Chicago.
          </p>

          {/* Booking summary */}
          <dl className="confirmed-details" aria-label="Reservation summary">
            <div className="confirmed-detail-row">
              <dt>
                <span aria-hidden="true">📅</span> Date
              </dt>
              <dd>{booking.date}</dd>
            </div>
            <div className="confirmed-detail-row">
              <dt>
                <span aria-hidden="true">🕐</span> Time
              </dt>
              <dd>{booking.time}</dd>
            </div>
            <div className="confirmed-detail-row">
              <dt>
                <span aria-hidden="true">👥</span> Guests
              </dt>
              <dd>{booking.guests} {Number(booking.guests) === 1 ? 'person' : 'people'}</dd>
            </div>
            <div className="confirmed-detail-row">
              <dt>
                <span aria-hidden="true">🎉</span> Occasion
              </dt>
              <dd>{OCCASION_LABELS[booking.occasion] || booking.occasion}</dd>
            </div>
            {booking.requests && (
              <div className="confirmed-detail-row confirmed-detail-row--full">
                <dt>
                  <span aria-hidden="true">📝</span> Special Requests
                </dt>
                <dd>{booking.requests}</dd>
              </div>
            )}
          </dl>

          <p className="confirmed-email">
            A confirmation has been sent to <strong>{booking.email}</strong>
          </p>

          {/* Actions */}
          <div className="confirmed-actions">
            <Link to="/" className="btn btn-secondary">Back to Home</Link>
            <Link to="/booking" className="btn btn-primary">New Reservation</Link>
          </div>

        </article>
      </div>
    </section>
  );
}

export default ConfirmedBooking;
