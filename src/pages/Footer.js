import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>GoMechanic</h3>
          <p>Your trusted partner for all automotive services.</p>
        </div>
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>Oil Change</li>
            <li>Brake Inspection</li>
            <li>AC Service</li>
            <li>Car Cleaning</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@gomechanic.com</p>
          <p>Phone: +1-800-GOMECH</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 GoMechanic. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 