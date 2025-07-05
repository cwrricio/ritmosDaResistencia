import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Login.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de login aqui
    console.log({ email, password, rememberMe });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input 
          type="email" 
          className="form-control" 
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Senha</label>
        <input 
          type="password" 
          className="form-control" 
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="d-flex justify-content-between mb-3">
        <div className="form-check">
          <input 
            type="checkbox" 
            className="form-check-input" 
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="remember">Lembrar de mim</label>
        </div>
        <Link to="/pages/cadastro" className="text-white text-decoration-none">Não tenho Cadastro!</Link>
      </div>
      
      <button type="submit" className={`btn ${styles.signInBtn} text-white w-100 mb-3`}>
        Conectar
      </button>
      
      <button type="button" className={`btn ${styles.googleBtn} w-100`}>
        <img src="/assets/googlelogo.svg" alt="Google logo" />
        Conectar com Google
      </button>
    </form>
  );
};

export default LoginForm;