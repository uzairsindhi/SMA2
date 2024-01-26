import React from 'react';
import './Footer.css'; // Import your stylesheet for additional styling if needed

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h2>About Us</h2>
          <p>School Management Web Application</p>
          <p>Developed by Cyber Taleem</p>
        </div>
        <div className="footer-section">
          <h2>Contact</h2>
          <p>Email: admin@cybertaleem.com</p>
          <p>Phone: +923036670790</p>
        </div>
        <div className="footer-section">
        
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} School Management App. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
