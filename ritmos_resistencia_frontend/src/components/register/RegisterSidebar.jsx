import React from 'react';
import styles from '../../styles/register/Register.module.css';

const RegisterSidebar = () => {
  return (
    <div className={`col-md-7 ${styles.bgOrange} order-2 order-md-1`}>
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <img src="/assets/menino.svg" className="w-50" alt="Ilustração de cadastro" />
      </div>
    </div>
  );
};

export default RegisterSidebar;