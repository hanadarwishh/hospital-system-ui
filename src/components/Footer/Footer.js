import React from "react";
import "../Footer/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-section">
          <h2 className="footer-logo">Hospital Logo</h2>
          <p className="footer-description">
            Card description. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sit rhoncus imperdiet nisi.
          </p>
        </div>

        {/* Center Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Card Titles</h3>
          {Array(8)
            .fill("Card title")
            .map((title, index) => (
              <a key={index} href="#" className="footer-link">
                {title}
              </a>
            ))}
        </div>

        {/* Right Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="footer-social-icons">
            <a href="#" aria-label="Facebook" className="footer-icon">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Twitter" className="footer-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram" className="footer-icon">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
