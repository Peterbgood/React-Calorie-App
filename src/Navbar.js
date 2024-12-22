import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar fixed-bottom navbar-light bg-light">
      <div className="container-fluid">
        <ul className="nav w-100 justify-content-center">
          <li className="nav-item">
            <Link className="nav-link" to="/">Food Log</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="https://peterbgood.github.io/Cal/week.html">Week</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="https://peterbgood.github.io/Cal/yearly.html">Year</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="https://peterbgood.github.io/Cal/weight.html">Weight</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;