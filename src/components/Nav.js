/**
 * Nav.js
 * Responsive navigation bar.
 * – Displays the Little Lemon logo on the left
 * – Shows nav links on desktop; collapses to a hamburger on mobile
 * – Uses aria-expanded / aria-controls for accessible menu toggling
 */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

/* Navigation links configuration – single source of truth */
const NAV_LINKS = [
  { to: '/',        label: 'Home' },
  { to: '/booking', label: 'Reservations' },
];

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  /** Toggle mobile menu */
  const toggleMenu = () => setMenuOpen(prev => !prev);

  /** Close menu when a link is clicked (mobile UX) */
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav-header" role="banner">
      <div className="nav-container container">
        {/* Brand / Logo */}
        <NavLink to="/" className="nav-logo" aria-label="Little Lemon – go to homepage">
          {/* Inline SVG brand mark (simplified logo shape) */}
          <span className="nav-logo-text">
            <span className="nav-logo-name">Little Lemon</span>
            <span className="nav-logo-city">Chicago</span>
          </span>
        </NavLink>

        {/* Desktop navigation */}
        <nav className="nav-links" aria-label="Primary navigation">
          <ul role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link--active' : 'nav-link'
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger button */}
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="nav-mobile"
          aria-label="Mobile navigation"
        >
          <ul role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link--active' : 'nav-link'
                  }
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Nav;
