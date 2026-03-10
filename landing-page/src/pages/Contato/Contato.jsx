import "./Contato.css";

function Contato() {
  return (
    <section className="contato container">
      <h1>Solicite uma Demonstração</h1>

      <div className="soft-card contato-card">
        <input type="text" placeholder="Nome completo" />
        <input type="email" placeholder="Email profissional" />
        <textarea placeholder="Mensagem"></textarea>
        <button>Enviar</button>
      </div>
    </section>
  );
}

export default Contato;