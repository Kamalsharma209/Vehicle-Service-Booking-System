import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="company-info">
        <h3>VBD Car Services</h3>
        <p>123 Main Street, City, Country</p>
        <p>Email: info@vbdcarservices.com | Phone: +123 456 7890</p>
      </div>
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> |
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </div>
    <div className="footer-bottom">
      &copy; {new Date().getFullYear()} VBD Car Services. All rights reserved.
    </div>
  </footer>
);

export default Footer; 