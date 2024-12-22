import React from 'react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';

const CustomLink = ({ to, children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    if (to.startsWith('http')) {
      event.preventDefault();
      window.location.href = to;
    } else {
      navigate(to);
    }
  };

  if (to.startsWith('http')) {
    return (
      <a href={to} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
  return (
    <ReactLink to={to} onClick={handleClick} {...props}>
      {children}
    </ReactLink>
  );
};

export default CustomLink;