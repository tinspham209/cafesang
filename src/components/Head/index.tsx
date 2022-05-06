import React from 'react';
import './styles.scss';

export const Head: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className="cmp-head-container">
      <h3>{title}</h3>
      <div className="cmp-head-extras">{children}</div>
    </div>
  );
};
