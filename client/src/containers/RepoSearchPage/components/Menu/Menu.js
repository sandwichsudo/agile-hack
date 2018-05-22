import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './Menu.scss'

const Menu = ({ items }) => (
  <ul className="Menu">
    {items.map(item => <li className="Menu__item" key={item.to}>
        <NavLink exact className="Menu__item__link" activeStyle={{ textDecoration: 'underline' }} to={item.to}>{item.title}</NavLink>
      </li>)}
  </ul>
);

Menu.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Menu;
