import React from 'react';
import { Link } from 'react-router-dom';
import style from 'styled-components';

const NavDiv = style.div`
  background: gray;
  font-size: 3em;
`;

const NavLink = style(Link)`
  color: black;
  text-decoration-line:none;
  margin-left: 10%;
  &:hover{
    color: #444;
  }
  `;

function NavBar() {
  const navString = 'Where\'s Waldo';

  return (
    <NavDiv>
      <nav><NavLink to="/wheres-waldo">{navString}</NavLink></nav>
    </NavDiv>
  );
}

export default NavBar;
