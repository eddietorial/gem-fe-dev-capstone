/**
 * App.js
 * Root application component. Defines client-side routing using
 * React Router v6. All pages are nested inside the shared layout
 * that renders the persistent Nav and Footer.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ConfirmedBooking from './pages/ConfirmedBooking';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Skip-to-content link for keyboard / screen-reader users */}
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content">
        <Routes>
          <Route path="/"           element={<HomePage />} />
          <Route path="/booking"    element={<BookingPage />} />
          <Route path="/confirmed"  element={<ConfirmedBooking />} />
          {/* Catch-all 404 */}
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

/** Inline 404 component – simple and clear */
function NotFound() {
  return (
    <section
      className="section container"
      style={{ textAlign: 'center', minHeight: '60vh', display: 'flex',
               flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-green)' }}>
        404
      </h1>
      <p style={{ fontSize: '1.2rem', margin: '16px 0' }}>
        Oops – this page doesn't exist.
      </p>
      <a href="/" className="btn btn-primary">Go back home</a>
    </section>
  );
}

export default App;
