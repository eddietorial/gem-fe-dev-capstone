/**
 * HomePage.js
 * Route: /
 *
 * Assembles the homepage from independent section components.
 * Each section is semantically labelled for accessibility.
 *
 * Section order (matches Meta UX design):
 *  1. Hero    — headline, CTA
 *  2. Specials — weekly menu items
 *  3. Testimonials — customer reviews
 *  4. About   — restaurant story
 */
import Hero from '../components/Hero';
import Specials from '../components/Specials';
import Testimonials from '../components/Testimonials';
import About from '../components/About';

function HomePage() {
  return (
    <>
      <Hero />
      <Specials />
      <Testimonials />
      <About />
    </>
  );
}

export default HomePage;
