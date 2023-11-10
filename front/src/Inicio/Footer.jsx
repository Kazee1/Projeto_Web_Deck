import "../Styles/Footer.css";

export default function Footer() {
  return (
    <footer>
      <p>
        © 2023 Gabriel Fernando, Mateus Silva e Lucas Ferreira. Todos os
        direitos reservados.
      </p>
      <div className="footer-links">
        <a href="url_da_politica" className="privacy-link">
          Política de Privacidade
        </a>
        <p> | </p>
        <a href="url_dos_termos" className="privacy-link">
          Termos de Uso
        </a>
      </div>
    </footer>
  );
}
