import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Menu.scss'

const Menu = ({ items }) => (
  <ul className="Menu">
    {items.map(item => <li className="Menu__item" key={item.to}>
        <Link className="Menu__item__link" to={item.to}>{item.title}</Link>
      </li>)}
  </ul>
);

Menu.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Menu;
