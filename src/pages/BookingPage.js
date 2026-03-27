/**
 * BookingPage.js
 * Route: /booking
 *
 * This page:
 *  1. Initialises available time slots via useReducer 
 *  2. Passes slots and callbacks into the reusable <BookingForm>
 *  3. On successful submission, navigates to /confirmed with booking data
 */
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { initializeTimes, updateTimes } from '../utils/bookingUtils';
import './BookingPage.css';

function BookingPage() {
  const navigate = useNavigate();

  // useReducer manages available time slots.
  
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  /** Called by BookingForm when the user picks a date */
  const handleDateChange = (date) => {
    dispatch({ type: 'UPDATE_TIMES', date });
  };

  /** Called by BookingForm after successful client-side validation */
  const handleSubmit = (bookingData) => {
    // In production this would call an API; for now we navigate immediately
    navigate('/confirmed', { state: { booking: bookingData } });
  };

  return (
    <section className="booking-page section" aria-labelledby="booking-heading">
      <div className="booking-layout container">

        {/* Left: form */}
        <div className="booking-form-panel">
          <h1 id="booking-heading" className="booking-title">Reserve a Table</h1>
          <p className="booking-subtitle">
            Book online in under a minute. Confirmation sent straight to your inbox.
          </p>

          <BookingForm
            availableTimes={availableTimes}
            onDateChange={handleDateChange}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Right: decorative info panel */}
        <aside className="booking-info-panel" aria-label="Restaurant information">
          <div className="booking-info-card">
            <h2>Good to Know</h2>
            <ul>
              <li>
                <span className="info-icon" aria-hidden="true">🕐</span>
                <span>Reservations held for <strong>15 minutes</strong></span>
              </li>
              <li>
                <span className="info-icon" aria-hidden="true">👥</span>
                <span>Groups over 10? Call us at <a href="tel:+13125550192">+1 (312) 555-0192</a></span>
              </li>
              <li>
                <span className="info-icon" aria-hidden="true">♿</span>
                <span>Fully wheelchair accessible dining room</span>
              </li>
              <li>
                <span className="info-icon" aria-hidden="true">🌿</span>
                <span>Vegan & gluten-free options available</span>
              </li>
              <li>
                <span className="info-icon" aria-hidden="true">📍</span>
                <span>263 S Wacker Dr, Chicago IL 60606</span>
              </li>
            </ul>
          </div>

          <div className="booking-hours">
            <h2>Opening Hours</h2>
            <dl>
              <div><dt>Mon – Fri</dt><dd>11:00 am – 10:00 pm</dd></div>
              <div><dt>Saturday</dt><dd>10:00 am – 11:00 pm</dd></div>
              <div><dt>Sunday</dt>  <dd>10:00 am – 10:00 pm</dd></div>
            </dl>
          </div>
        </aside>

      </div>
    </section>
  );
}

export default BookingPage;
