/**
 * Hero.js
 * Full-bleed hero section — the first thing visitors see.
 * Shows the brand name, city, a short description and the
 * primary CTA ("Reserve a Table") linking to /booking.
 *
 * Accessibility:
 *  - section is labelled by its h1 via aria-labelledby
 *  - CTA has a descriptive aria-label for context
 *  - decorative image is aria-hidden so screen readers skip it
 */
import { Link } from 'react-router-dom';
import restaurantFoodImg from '../restauranfood.jpg';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-container container">

        {/* ── Text side ── */}
        <div className="hero-text">
          <h1 id="hero-heading" className="hero-title">Little Lemon</h1>
          <p className="hero-location">Chicago</p>
          <p className="hero-description">
            We are a family-owned Mediterranean restaurant focused on traditional
            recipes served with a modern twist. Every dish is crafted from fresh,
            locally sourced ingredients.
          </p>
          <Link
            to="/booking"
            className="btn btn-primary hero-cta"
            aria-label="Reserve a table at Little Lemon"
          >
            Reserve a Table
          </Link>
        </div>

        {/* ── Image side ── */}
        <div className="hero-image-wrapper" aria-hidden="true">
          <img
            src={restaurantFoodImg}
            alt="A beautifully plated Mediterranean dish at Little Lemon"
            className="hero-image"
            loading="eager"
            width="560"
            height="420"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;
