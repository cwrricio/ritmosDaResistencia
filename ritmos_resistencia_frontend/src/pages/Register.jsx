import React from 'react';
import styles from '../styles/register/Register.module.css';
import RegisterForm from '../components/register/RegisterForm';
import RegisterSidebar from '../components/register/RegisterSidebar';

const Register = () => {
  return (
    <div className={`container-fluid p-0 ${styles.cadastroPage}`}>
      <div className="row g-0">
        <RegisterSidebar />
      
        <div className={`col-md-5 ${styles.bgBrick} text-white order-1 order-md-2`}>
          <div className={`d-flex flex-column justify-content-center ${styles.loginContainer}`}>
            <div className="mx-auto w-100" style={{ maxWidth: '400px' }}>
              <h2 className="mb-4">CADASTRAR</h2>
              <p className="text-light mb-4">RITMOS DA RESISTÊNCIA</p>
              
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;