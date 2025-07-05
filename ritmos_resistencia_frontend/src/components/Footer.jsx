import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={`footer text-light ${styles.footer}`}>
      <div className={`container ${styles.footerContainer}`}>
        <div className="row align-items-center mb-4">
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <img src="/assets/logo.svg" alt="footer-logo" className="img-fluid " style={{ maxWidth: '30px' }} />
          </div>
          <div className={`col-md-8 text-center text-md-end footer-social ${styles.footerSocial}`}>
            <a href="#"><img src="../assets/logosFooter/Logo Instagram.svg" alt="Instagram" /></a>
            <a href="#"><img src="../assets/logosFooter/LinkedIn.svg" alt="LinkedIn" /></a>
            <a href="#"><img src="../assets/logosFooter/Logo YouTube.svg" alt="YouTube" /></a>
            <a href="#"><img src="../assets/logosFooter/X Logo.svg" alt="Twitter" /></a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>Sobre</h5>
            <ul className="list-unstyled">
              <li><Link to="#" className="text-light">Desenvolvedores</Link></li>
              <li><Link to="#" className="text-light">Contato</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Suporte</h5>
            <ul className="list-unstyled">
              <li><Link to="#" className="text-light">Pedir Ajuda</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5>FAQs</h5>
            <ul className={`list-unstyled ${styles.footerLinks}`}>
              <li><Link to="#" className="text-light">Perguntas Frequentes</Link></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col text-center mt-4">
            <p className="mb-0">&copy; 2025 Ritmos da Resistência. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;