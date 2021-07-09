import React from 'react';
import { Link } from 'react-router-dom';

export const Tabs: React.FC = () => {
  return (
    <div className="d-flex justify-content-center pb-3">
      <div className="pr-1">
        <Link to="/all">Все</Link>
      </div>
      <span>/</span>
      <div className="pr-1 pl-1">
        <Link to="/active">Активные</Link>
      </div>
      <span>/</span>
      <div className="pl-1">
        <Link to="/deleted">Удаленные</Link>
      </div>
    </div>
  );
};
