import React from 'react';

const Section = ({ children, title, className = '' }) => {
  return (
    <section className={`container my-5 ${className}`}>
      <div className="row">
        <div className="col-md-12">
          {title && <h3 className="text-center">{title}</h3>}
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;