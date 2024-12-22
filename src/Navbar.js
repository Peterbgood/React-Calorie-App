import React from 'react';
import CustomLink from './CustomLink';

const Navbar = () => {
  return (
    <nav className="navbar fixed-bottom navbar-light bg-light">
      <div className="container-fluid">
        <ul className="nav w-100 justify-content-center">
          <li className="nav-item">
            <CustomLink className="nav-link" to="/">Food Log</CustomLink>
          </li>
          <li className="nav-item">
            <CustomLink className="nav-link" to="https://peterbgood.github.io/Cal/week.html">Week</CustomLink>
          </li>
          <li className="nav-item">
            <CustomLink className="nav-link" to="https://peterbgood.github.io/Cal/yearly.html">Year</CustomLink>
          </li>
          <li className="nav-item">
            <CustomLink className="nav-link" to="https://peterbgood.github.io/Cal/weight.html">Weight</CustomLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;