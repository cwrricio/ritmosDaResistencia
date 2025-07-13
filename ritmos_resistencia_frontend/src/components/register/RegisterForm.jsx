import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import styles from '../../styles/register/Register.module.css';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    remember: false
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('As senhas não coincidem!');
      toast.error('Erro de validação', { description: 'As senhas não coincidem!' });
      setLoading(false);
      return;
    }

    try {
      const userData = {
        nome: formData.name,
        email: formData.email,
        senha: formData.password,
      };

      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message || errorData.detail || `Erro HTTP: ${response.status}`;
        throw new Error(message);
      }

      const newUser = await response.json();
      console.log('Usuário cadastrado com sucesso:', newUser);

      toast.success('Cadastro realizado com sucesso!', {
          description: 'Você já pode fazer login.'
      });

      navigate('/pages/login');

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setErrorMessage(error.message || 'Ocorreu um erro ao tentar cadastrar. Tente novamente.');
      toast.error('Erro no cadastro', { description: error.message || 'Verifique sua conexão ou tente mais tarde.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div className={`alert alert-danger ${styles.formError}`}>{errorMessage}</div>}

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Senha</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirmar Senha</label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
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
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            disabled={loading}
          />
          <label className="form-check-label" htmlFor="remember">Lembrar de mim</label>
        </div>
      </div>

      <button type="submit" className={`btn ${styles.signInBtn} text-white w-100 mb-3`} disabled={loading}>
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
};

export default RegisterForm;