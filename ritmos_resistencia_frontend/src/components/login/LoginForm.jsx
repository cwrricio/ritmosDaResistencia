// src/components/login/LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import styles from '../../styles/login/Login.module.css';

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const loginData = {
        email: email,
        senha: password,
      };

      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        // Se o backend retornar 401 Unauthorized, a mensagem de erro pode ser vazia
        // ou vir de error.message.
        const errorDetail = await response.json().catch(() => ({ message: 'Resposta inválida do servidor.' })); // Tenta ler JSON, senão padrão
        throw new Error(errorDetail.message || `Erro HTTP: ${response.status}`);
      }

      // *** ADIÇÃO CRÍTICA AQUI: Receber o objeto Usuario em JSON ***
      const loggedInUser = await response.json(); 
      console.log('Login bem-sucedido. Usuário:', loggedInUser);
      
      let displayUserName = loggedInUser.nome || 'Usuário'; // Pega o nome do objeto Usuario
      const firstName = displayUserName.split(' ')[0]; // Pega apenas o primeiro nome

      toast.success('Login realizado com sucesso!', { description: `Bem-vindo(a), ${firstName}!` });

      // *** ARMAZENAR NO localStorage: idUsuario e nome do usuário ***
      localStorage.setItem('isLoggedIn', 'true'); // Marca como logado
      localStorage.setItem('userName', firstName); // Armazena apenas o primeiro nome
      localStorage.setItem('userId', loggedInUser.idUsuario); // Armazena o ID do usuário (CRÍTICO para o formulário de artista)

      navigate('/'); // Redireciona para a Home (rota raiz)
      
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage(error.message);
      toast.error('Erro no Login', { description: error.message || 'Email ou senha inválidos.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div className={`alert alert-danger ${styles.formError}`}>{errorMessage}</div>}

      <div className="mb-3">
        <label htmlFor="email" className="form-label text-white">Email</label>
        <input 
          type="email" 
          className={`form-control ${styles.formControlCustom}`} 
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="password" className="form-label text-white">Senha</label>
        <input 
          type="password" 
          className={`form-control ${styles.formControlCustom}`} 
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
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
            disabled={loading}
          />
          <label className="form-check-label text-white" htmlFor="remember">Lembrar de mim</label>
        </div>
        <Link to="/pages/cadastro" className="text-white text-decoration-none">Não tenho Cadastro!</Link>
      </div>
      
      <button type="submit" className={`btn ${styles.signInBtn} text-white w-100 mb-3`} disabled={loading}>
        {loading ? 'Conectando...' : 'Conectar'}
      </button>
      
      <button type="button" className={`btn ${styles.googleBtn} w-100`} disabled={loading}>
        <img src="/assets/googlelogo.svg" alt="Google logo" /> 
        Conectar com Google
      </button>
    </form>
  );
};

export default LoginForm;