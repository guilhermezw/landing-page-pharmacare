import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">
            pharma <span className="italic">care</span>
          </h2>
          <p className="footer-tagline">Cuidar é nossa ciência.</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Produto</h3>
            <ul>
              <li><a href="#features">Funcionalidades</a></li>
              <li><a href="#dashboard">Dashboard</a></li>
              <li><a href="#pricing">Planos</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Suporte</h3>
            <ul>
              <li><a href="#ajuda">Central de Ajuda</a></li>
              <li><a href="#termos">Termos de Uso</a></li>
              <li><a href="#privacidade">Privacidade (LGPD)</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="divider"></div>
        <div className="footer-info">
          <p>&copy; {currentYear} PharmaCare. Todos os direitos reservados.</p>
          <p className="since-text">since 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;