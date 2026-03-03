import "./Navbar.css";
import logo from "../../assets/logo.png"; // Verifique se o caminho do logo está correto para o seu projeto

function Navbar() {
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
          <img src={logo} alt="PharmaCare" className="logo-img" />
        </a>

        <nav>
          <ul className="nav-links">
            <li><a href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>Home</a></li>
            <li><a href="#problema" onClick={(e) => scrollToSection(e, 'problema')}>Problema</a></li>
            <li><a href="#solucao" onClick={(e) => scrollToSection(e, 'solucao')}>Solução</a></li>
            <li>
              {/* Transformamos o link num botão chamativo! */}
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