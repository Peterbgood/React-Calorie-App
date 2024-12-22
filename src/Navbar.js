import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar fixed-bottom navbar-light bg-light">
      <div className="container-fluid">
        <ul className="nav w-100 justify-content-center">
          <li className="nav-item">
            <a className="nav-link" href="/">Food Log</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://peterbgood.github.io/Cal/week.html" target="_blank">Week</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://peterbgood.github.io/Cal/yearly.html" target="_blank">Year</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://peterbgood.github.io/Cal/weight.html" target="_blank">Weight</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;