import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import React, { useState, useEffect } from 'react'; 

const Header = () => {
const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const name = localStorage.getItem('userName') || 'Usuário';
      setIsLoggedIn(loggedIn);
      setUserName(name);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []); 
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem('userName');   
    setIsLoggedIn(false); 
    setUserName('');  
    navigate('/pages/login'); 
  };

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
            {/* se estiver logado muda os botões  */}
            {isLoggedIn ? (
               <li className="nav-item dropdown">
                <a className={`nav-link dropdown-toggle ${styles.navLinkCustom}`} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Olá, {userName}! 
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/pages/perfil">Minha Conta</Link></li>
                  <li><Link className="dropdown-item" to="/pages/configuracoes">Configurações</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Sair</button></li>
                </ul>
              </li>
            ) : (
              // se não, mostra os botões
              <>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLinkCustom}`} to="/pages/cadastro">INSCREVA-SE</Link>
            </li>
            <li className="nav-item">
              <Link className={`btn btn-custom ${styles.customBtn} ${styles.navLinkcustom}`} to="/pages/login">ENTRAR</Link>
            </li>
            </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;