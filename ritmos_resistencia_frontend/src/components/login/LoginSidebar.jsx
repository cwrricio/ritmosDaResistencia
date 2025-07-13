import React from 'react';
import styles from '../../styles/login/Login.module.css';

const LoginSidebar = () => {
  return (
    <div className={`col-md-7 ${styles.bgOrange} order-2 order-md-1`}>
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <img src="/assets/menina.svg" className="w-50" alt="Ilustração de login" />
      </div>
    </div>
  );
};

export default LoginSidebar;