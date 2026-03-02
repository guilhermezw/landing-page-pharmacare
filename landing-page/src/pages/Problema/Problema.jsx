import React from 'react';
import './Problema.css';

const Problema = () => {
  return (
    <section id="problema" className="problem-section">
      <div className="section-container">
        <div className="problem-grid">
          
          {/* Lado Esquerdo: Texto e Contexto */}
          <div className="problem-text">
            <span className="subtitle">O Cenário Atual</span>
            <h2 className="section-title">
              O risco invisível da <br />
              <span className="serif-italic">automedicação.</span>
            </h2>
            <p className="problem-description">
              Hoje, a maioria dos brasileiros utiliza medicamentos sem orientação adequada. 
              Isso resulta em erros de dosagem e interações perigosas que poderiam ser evitadas.
            </p>
            <div className="stat-highlight">
              <span className="stat-number">77%</span>
              <p>dos brasileiros admitem se automedicar habitualmente.</p>
            </div>
          </div>

          {/* Lado Direito: Gráfico Estilizado (Inspirado no Slide 2) */}
          <div className="problem-visual">
            <div className="chart-container">
              <div className="bar-group">
                <div className="bar-label">Automedicação</div>
                <div className="bar-wrapper">
                  <div className="bar-fill primary" style={{ height: '77%' }}>
                    <span className="bar-percentage">77%</span>
                  </div>
                </div>
              </div>
              <div className="bar-group">
                <div className="bar-label">Acompanhamento</div>
                <div className="bar-wrapper">
                  <div className="bar-fill secondary" style={{ height: '23%' }}>
                    <span className="bar-percentage">23%</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="chart-caption">Fonte: Pesquisa ICTQ / PharmaCare Data</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Problema;