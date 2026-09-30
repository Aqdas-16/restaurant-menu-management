import React, { useState } from "react";

function Header({ onOpenBook }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">

      <div className="navbar">

        <a
          href="#home"
          className="brand"
          onClick={() => setMenuOpen(false)}
        >

          <div className="brand-logo">
            SH
          </div>

          <div className="brand-info">

            <strong>SPICE HAVEN</strong>

            <span>INDIAN CUISINE</span>

          </div>

        </a>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          ☰
        </button>

        <nav
          className={
            menuOpen
              ? "navigation navigation-open"
              : "navigation"
          }
        >

          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>

          <a
            href="#menu"
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </a>

          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>

          <button
            type="button"
            className="menu-book-link"
            onClick={() => {
              setMenuOpen(false);
              if (onOpenBook) onOpenBook("All");
            }}
          >
            <span>▤</span>
            Menu Book
          </button>

        </nav>

      </div>

    </header>
  );
}

export default Header;