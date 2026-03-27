/**
 * Footer.js
 * Site-wide footer with contact info, navigation and social links.
 * Uses semantic <footer>, <address> and <nav> elements.
 */
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container container">

        {/* Brand column */}
        <div className="footer-brand">
          <p className="footer-brand-name">Little Lemon</p>
          <p className="footer-brand-tagline">Mediterranean Cuisine · Chicago</p>
          <p className="footer-bio">
            A family-owned restaurant celebrating the bold flavours of the
            Mediterranean coast since 2003. Built with ♥ by eddietorial.
          </p>
        </div>

        {/* Quick links */}
        <nav className="footer-nav" aria-label="Footer navigation">
          <h2 className="footer-heading">Explore</h2>
          <ul role="list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/booking">Reservations</Link></li>
            <li><a href="#specials">Our Menu</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>

        {/* Contact */}
        <address className="footer-contact">
          <h2 className="footer-heading">Contact</h2>
          <p>263 S Wacker Dr, Chicago, IL 60606</p>
          <p>
            <a href="tel:+13125550192">+1 (312) 555-0192</a>
          </p>
          <p>
            <a href="mailto:hello@littlelemon.com">hello@littlelemon.com</a>
          </p>
          <p className="footer-hours">
            Mon – Fri: 11 am – 10 pm<br />
            Sat – Sun: 10 am – 11 pm
          </p>
        </address>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Little Lemon Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
