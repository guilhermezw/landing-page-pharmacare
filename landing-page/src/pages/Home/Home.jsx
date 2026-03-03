import "./Home.css";
// IMPORTANTE: Ajuste o caminho abaixo se necessário!
import dashImg from "../../assets/dashboard.png"; 
import pacientesImg from "../../assets/tela-pacientes.png"; 

function Home() {
  return (
    <div className="landing-page">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="hero-section">
        <div className="container hero-inner">
          <span className="badge">Nova Plataforma</span>
          <h1>A revolução visual e inteligente da gestão clínica.</h1>
          <p>
            Um ecossistema projetado para centralizar o histórico de pacientes, 
            estruturar anamneses e garantir a segurança terapêutica com precisão.
          </p>
          <button 
            className="btn-primary" 
            onClick={() => document.getElementById('contato').scrollIntoView({behavior: 'smooth'})}
          >
            Começar Agora
          </button>
        </div>
      </section>

      {/* 2. PROBLEMA (Adeus emojis! Olá SVGs elegantes) */}
      <section id="problema" className="problem-section">
        <div className="container">
          <div className="section-header">
            <h2>O fim dos dados fragmentados.</h2>
            <p>Diga adeus às planilhas soltas e ao risco de interações não detectadas.</p>
          </div>
          <div className="grid-3">
            <div className="soft-card">
              <div className="icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1612d3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <h3>Controle de Polifarmácia</h3>
              <p>Gerencie com clareza pacientes que fazem uso de múltiplos medicamentos.</p>
            </div>
            
            <div className="soft-card">
              <div className="icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1612d3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3>Prevenção de Interações</h3>
              <p>Antecipe e evite reações adversas com um panorama completo das prescrições.</p>
            </div>

            <div className="soft-card">
              <div className="icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1612d3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
              </div>
              <h3>Histórico Unificado</h3>
              <p>Substitua fichas de papel por um prontuário eletrônico sempre acessível.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE DASHBOARD (Mudei o ID para "solucao" para a Navbar funcionar!) */}
      <section id="solucao" className="showcase-section bg-soft-blue">
        <div className="container split-layout">
          <div className="split-text">
            <span className="subtitle">Visão Geral</span>
            <h2>O seu consultório, em uma única tela.</h2>
            <p>
              Acompanhe suas consultas do dia, monitore retornos pendentes e reações adversas de forma visual. O nosso <strong>Assistente IA</strong> integrado analisa os dados e fornece alertas em tempo real sobre interações e dosagens, funcionando como seu braço direito na clínica.
            </p>
            <ul className="feature-list">
              <li>Métricas em tempo real</li>
              <li>Assistente Farmacêutico Inteligente</li>
              <li>Acesso rápido às consultas recentes</li>
            </ul>
          </div>
          <div className="split-image-container">
            <img src={dashImg} alt="Dashboard PharmaCare" className="mockup-img" />
          </div>
        </div>
      </section>

      {/* 4. SHOWCASE PACIENTES */}
      <section id="pacientes" className="showcase-section bg-white">
        <div className="container split-layout reverse">
          <div className="split-text">
            <span className="subtitle">Gestão de Pacientes</span>
            <h2>Cada paciente é único. O histórico também deve ser.</h2>
            <p>
              Encontre qualquer paciente em segundos. Nossa interface exibe de forma clara alergias, doenças crônicas e dados de contato logo na tela inicial. Menos tempo clicando, mais tempo focado no atendimento humano e assertivo.
            </p>
            <ul className="feature-list">
              <li>Busca inteligente por Nome, CPF ou Email</li>
              <li>Alertas visuais de alergias e condições crônicas</li>
              <li>Prontuário estruturado e rastreável</li>
            </ul>
          </div>
          <div className="split-image-container">
            <img src={pacientesImg} alt="Gestão de Pacientes" className="mockup-img" />
          </div>
        </div>
      </section>

      {/* 5. CONTATO */}
      <section id="contato" className="cta-section">
        <div className="container contact-layout">
          <div className="contact-text">
            <h2>Pronto para digitalizar o seu atendimento?</h2>
            <p>Deixe o seu contato e a nossa equipe agendará uma demonstração guiada pela plataforma. Descubra na prática como a PharmaCare otimiza a sua rotina.</p>
          </div>
          
          <div className="contact-card">
            <h3>Fale Conosco</h3>
            <div className="contato-form">
              <input type="text" placeholder="Nome completo" />
              <input type="email" placeholder="Email profissional" />
              <button className="btn-primary full-width">Solicitar Demonstração</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;