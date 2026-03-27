/**
 * Testimonials.js
 * Customer reviews section on the homepage.
 * Star ratings are presented accessibly with aria-label.
 */
import './Testimonials.css';

const REVIEWS = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    date: 'March 2025',
    text:
      'The Greek salad is absolutely divine — fresh ingredients, perfect balance of flavours. ' +
      'The staff were warm and attentive. Will definitely be back!',
    avatar: 'S',
  },
  {
    id: 2,
    name: 'James T.',
    rating: 5,
    date: 'February 2025',
    text:
      'Booked a birthday dinner for my wife and the team went above and beyond. ' +
      'The lemon dessert alone is worth the trip to Chicago.',
    avatar: 'J',
  },
  {
    id: 3,
    name: 'Priya K.',
    rating: 4,
    date: 'January 2025',
    text:
      'Fantastic Mediterranean food in a cosy setting. The bruschetta was phenomenal. ' +
      'Online reservation was quick and easy.',
    avatar: 'P',
  },
  {
    id: 4,
    name: 'Carlos R.',
    rating: 5,
    date: 'December 2024',
    text:
      'Best restaurant in Wacker Drive, hands down. The portions are generous, ' +
      'the wine list is excellent and the ambiance is perfect for a date night.',
    avatar: 'C',
  },
];

/** Renders filled / empty star characters accessibly */
function StarRating({ rating, max = 5 }) {
  const filled = '★'.repeat(rating);
  const empty  = '☆'.repeat(max - rating);
  return (
    <span
      className="testimonial-stars"
      aria-label={`Rated ${rating} out of ${max} stars`}
      role="img"
    >
      <span aria-hidden="true">{filled}{empty}</span>
    </span>
  );
}

function Testimonials() {
  return (
    <section
      className="testimonials section"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <h2 id="testimonials-heading">What Our Guests Say</h2>

        <ul className="testimonials-grid" role="list">
          {REVIEWS.map(review => (
            <li key={review.id} className="testimonial-card">
              <div className="testimonial-header">
                {/* Avatar */}
                <div className="testimonial-avatar" aria-hidden="true">
                  {review.avatar}
                </div>
                <div>
                  <p className="testimonial-name">{review.name}</p>
                  <time className="testimonial-date" dateTime={review.date}>
                    {review.date}
                  </time>
                </div>
              </div>

              <StarRating rating={review.rating} />

              <blockquote className="testimonial-text">
                <p>"{review.text}"</p>
              </blockquote>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}

export default Testimonials;
