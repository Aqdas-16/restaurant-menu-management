import React from "react";

function Footer() {
  return (
    <footer className="footer" id="about">

      <div className="footer-content">

        <div>

          <div className="footer-logo">
            SPICE HAVEN
          </div>

          <p>
            Authentic Indian cuisine prepared with
            traditional flavours and a modern touch.
          </p>

        </div>

        <div className="footer-column">

          <span>CONTACT</span>

          <p>+91 98765 43210</p>
          <p>hello@spicehaven.com</p>

        </div>

        <div className="footer-column">

          <span>OPENING HOURS</span>

          <p>Monday - Sunday</p>
          <p>11:00 AM - 11:00 PM</p>

        </div>

      </div>

      <div className="footer-bottom">

        <span>
          © 2026 Spice Haven
        </span>

        <span>
          Restaurant Menu Management System
        </span>

      </div>

    </footer>
  );
}

export default Footer;