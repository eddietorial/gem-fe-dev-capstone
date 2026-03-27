/**
 * Nav.test.js
 * Unit tests for the navigation component.
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from '../components/Nav';

const renderNav = (initialRoute = '/') =>
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Nav />
    </MemoryRouter>
  );

describe('Nav', () => {
  test('renders the brand name', () => {
    renderNav();
    expect(screen.getByText(/little lemon/i)).toBeInTheDocument();
  });

  test('renders the Home link', () => {
    renderNav();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  test('renders the Reservations link', () => {
    renderNav();
    expect(screen.getByRole('link', { name: /reservations/i })).toBeInTheDocument();
  });

  test('renders the hamburger button', () => {
    renderNav();
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  test('hamburger has aria-expanded="false" initially', () => {
    renderNav();
    const btn = screen.getByRole('button', { name: /open menu/i });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  test('clicking hamburger opens mobile menu and updates aria-expanded', () => {
    renderNav();
    const btn = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  test('mobile menu nav is visible after hamburger click', () => {
    renderNav();
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument();
  });

  test('clicking hamburger again closes the menu', () => {
    renderNav();
    const btn = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(btn); // open
    fireEvent.click(btn); // close
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  test('header has role="banner"', () => {
    renderNav();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('logo link has descriptive aria-label', () => {
    renderNav();
    expect(
      screen.getByRole('link', { name: /little lemon.*homepage/i })
    ).toBeInTheDocument();
  });
});
