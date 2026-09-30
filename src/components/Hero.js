import React from "react";

function Hero({ onOpenBook }) {
  return (
    <section className="hero" id="home">

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <span className="hero-label">
          WELCOME TO
        </span>

        <h1>Spice Haven</h1>

        <p>
          Authentic Indian flavours, thoughtfully prepared
          and served around the table.
        </p>

        <div className="hero-details">

          <span>★ 4.8</span>
          <span>Indian Cuisine</span>
          <span>25 min</span>

        </div>

        <button
          type="button"
          className="hero-button"
          onClick={() => onOpenBook && onOpenBook("All")}
        >
          Open Menu Book
        </button>

      </div>

    </section>
  );
}

export default Hero;