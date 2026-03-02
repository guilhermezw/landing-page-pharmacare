import React, { useState, useEffect } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo baseado no seu slide 1 */}
        <div className="navbar-logo">
          pharma<span className="italic">care</span>
        </div>

        {/* Links de Navegação */}
        <ul className="nav-links">
          <li><a href="#problema">O Problema</a></li>
          <li><a href="#solucao">A Solução</a></li>
          <li><a href="#modelo">Modelo de Negócio</a></li>
        </ul>

        {/* Call to Action Lateral */}
        <div className="nav-actions">
          <button className="btn-login">Entrar</button>
          <button className="btn-cta-nav">Começar Agora</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;