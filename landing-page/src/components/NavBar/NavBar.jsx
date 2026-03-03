import { useState, useEffect } from "react";
import "./NavBar.css";
import logo from "../../assets/logo.png"; 

function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "problema", "solucao", "contato"];
      const scrollPosition = window.scrollY + 120; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>
          <img src={logo} alt="Pharma Care" className="logo-img" />
        </a>

        <nav>
          <ul className="nav-links">
            <li>
              <a 
                href="#hero" 
                className={activeSection === "hero" ? "active" : ""} 
                onClick={(e) => scrollToSection(e, 'hero')}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#problema" 
                className={activeSection === "problema" ? "active" : ""} 
                onClick={(e) => scrollToSection(e, 'problema')}
              >
                Problema
              </a>
            </li>
            <li>
              <a 
                href="#solucao" 
                className={activeSection === "solucao" ? "active" : ""} 
                onClick={(e) => scrollToSection(e, 'solucao')}
              >
                Solução
              </a>
            </li>
            <li>
              <a 
                href="#contato" 
                className="btn-nav-contact" 
                onClick={(e) => scrollToSection(e, 'contato')}
              >
                Fale Conosco
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;