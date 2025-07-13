import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/login/Login.module.css';
import LoginForm from '../components/login/LoginForm';
import LoginSidebar from '../components/login/LoginSidebar';

const Login = () => {
  return (
    <div className={`container-fluid p-0 ${styles.loginPage}`}>
      <div className="row g-0">
        {/* Sidebar com ilustração */}
        <LoginSidebar />
        
        {/* Área de login */}
        <div className={`col-md-5 ${styles.bgBrick} text-white p-4 order-1 order-md-2`}>
          <div className={`d-flex flex-column justify-content-center ${styles.loginContainer}`}>
            <div className="mx-auto w-100" style={{ maxWidth: '400px' }}>
              <h2 className="mb-4">WELCOME BACK</h2>
              <p className="text-light mb-4">RITMOS DA RESISTÊNCIA</p>
              
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;