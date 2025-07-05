import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <nav className={`navbar navbar-expand-lg  ${styles.customNavbar}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="../assets/logo.svg" alt="Logo" className={`${styles.logo} d-inline-block align-text-top`} />
          <span className="text-white">RITMOS DA RESISTÊNCIA</span>
        </Link>

        <button 
          className={`navbar-toggler ${styles.togglerCustom}`} 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLinkCustom}`} to="/pages/formulario">SOU ARTISTA!</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLinkCustom}`} to="/pages/player">MUSIC PLAYER</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLinkCustom}`} to="/pages/apoie">APOIE</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLinkCustom}`} to="/pages/cadastro">INSCREVA-SE</Link>
            </li>
            <li className="nav-item">
              <Link className={`btn btn-custom ${styles.customBtn} ${styles.navLinkcustom}`} to="/pages/login">ENTRAR</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;