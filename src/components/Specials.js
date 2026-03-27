/**
 * Specials.js
 * "This Week's Specials" section on the homepage.
 * Displays three featured menu items using the uploaded brand assets.
 *
 * Accessibility:
 *  - section labelled via aria-labelledby → heading id
 *  - images have descriptive alt text
 *  - prices use aria-label ("Price: $12.99") not raw "$12.99"
 *  - card order links include context via aria-label
 */
import greekSaladImg   from '../greek-salad.jpg';
import lemonDessertImg from '../lemon-dessert.jpg';
import bruchetaImg     from '../bruchetta.svg';
import './Specials.css';

/* ── Menu data – single source of truth ── */
const SPECIALS = [
  {
    id: 1,
    name: 'Greek Salad',
    price: 12.99,
    description:
      'Crisp romaine, kalamata olives, sun-ripened tomatoes, cucumber and creamy feta ' +
      'drizzled with our house-made lemon-herb vinaigrette.',
    imgSrc: greekSaladImg,
    imgAlt: 'A fresh Greek salad with feta, olives and tomatoes in a white bowl',
  },
  {
    id: 2,
    name: 'Bruschetta',
    price: 5.99,
    description:
      'Sourdough grilled over charcoal, rubbed with garlic and piled high with ' +
      'diced heritage tomatoes, fresh basil and a drizzle of cold-pressed olive oil.',
    imgSrc: bruchetaImg,
    imgAlt: 'Bruschetta toasts topped with diced tomato and fresh basil leaves',
  },
  {
    id: 3,
    name: 'Lemon Dessert',
    price: 5.00,
    description:
      'House-made lemon tart with a buttery shortcrust shell, silky lemon curd and ' +
      'a dusting of icing sugar. A Little Lemon signature since day one.',
    imgSrc: lemonDessertImg,
    imgAlt: 'A slice of lemon tart dusted with icing sugar on a ceramic plate',
  },
];

function Specials() {
  return (
    <section
      className="specials section"
      id="specials"
      aria-labelledby="specials-heading"
    >
      <div className="container">

        {/* Section header row */}
        <div className="specials-header">
          <h2 id="specials-heading">This Week's Specials</h2>
          <a
            href="#specials"
            className="btn btn-secondary"
            aria-label="View our full online menu"
          >
            Online Menu
          </a>
        </div>

        {/* Card grid */}
        <ul className="specials-grid" role="list">
          {SPECIALS.map(item => (
            <li key={item.id} className="special-card">
              <img
                src={item.imgSrc}
                alt={item.imgAlt}
                className="special-card-img"
                loading="lazy"
                width="360"
                height="220"
              />
              <div className="special-card-body">
                <div className="special-card-title-row">
                  <h3 className="special-card-name">{item.name}</h3>
                  <span
                    className="special-card-price"
                    aria-label={`Price: $${item.price.toFixed(2)}`}
                  >
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="special-card-desc">{item.description}</p>
                <a
                  href="#specials"
                  className="special-card-order"
                  aria-label={`Order ${item.name} for delivery`}
                >
                  Order a delivery <span aria-hidden="true">→</span>
                </a>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}

export default Specials;
