import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="NavBar">
      <nav><Link to="/">Where&#39s Waldo</Link></nav>
    </div>
  );
}

export default NavBar;
