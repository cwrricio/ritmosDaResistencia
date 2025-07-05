import React, { useState } from 'react';
import styles from '../../styles/Register.module.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Dados do formulário:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
          />
          <label className="form-check-label" htmlFor="remember">Lembrar de mim</label>
        </div>
      </div>
      
      <button type="submit" className={`btn ${styles.signInBtn} text-white w-100 mb-3`}>
        Cadastrar
      </button>
    </form>
  );
};

export default RegisterForm;