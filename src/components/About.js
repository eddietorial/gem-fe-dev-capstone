/**
 * About.js
 * "Our Story" section on the homepage.
 * Uses both restaurant photos from the uploaded assets in an
 * overlapping-stack layout for visual interest.
 *
 * The decorative stacked images are aria-hidden because the
 * text content already tells the story.
 */
import restaurantImg     from '../restaurant.jpg';
import restaurantFoodImg from '../restauranfood.jpg';
import './About.css';

function About() {
  return (
    <section
      className="about section"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="about-container container">

        {/* ── Text ── */}
        <div className="about-text">
          <h2 id="about-heading">Our Story</h2>
          <p className="about-subtitle">Little Lemon · Chicago</p>

          <p>
            Founded in 2003 by siblings Mario and Adriana, Little Lemon began
            as a tiny twelve-seat café on Wacker Drive with a single mission:
            bring the honest, sun-drenched flavours of the Mediterranean coast
            to the heart of Chicago.
          </p>
          <p>
            Every dish on our menu is a tribute to the markets, fishing villages
            and family kitchens we fell in love with growing up. We source our
            ingredients from local farms and only work with suppliers who share
            our commitment to quality and sustainability.
          </p>
          <p>
            More than twenty years on, Little Lemon is still family-owned and
            still driven by the same passion: feed people well, make them feel
            at home.
          </p>
        </div>

        {/* ── Overlapping image stack ── */}
        <div className="about-images" aria-hidden="true">
          <img
            src={restaurantFoodImg}
            alt="Chef preparing a fresh Mediterranean dish"
            className="about-img about-img--top"
            loading="lazy"
            width="340"
            height="260"
          />
          <img
            src={restaurantImg}
            alt="The warm, inviting interior of Little Lemon restaurant"
            className="about-img about-img--bottom"
            loading="lazy"
            width="340"
            height="260"
          />
        </div>

      </div>
    </section>
  );
}

export default About;
