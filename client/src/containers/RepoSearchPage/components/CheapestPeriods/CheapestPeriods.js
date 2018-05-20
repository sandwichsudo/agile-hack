import React from 'react';
import PropTypes from 'prop-types';
import './CheapestPeriods.scss';

const CheapestPeriods = ({ periods, isTomorrow }) => (
  <div className="CheapestPeriods">
    { isTomorrow ? <h2 className="h4">Tomorrow</h2> : <h2 className="h4">Today</h2>}
    <ul className="Timeline">
      {periods.map(period => <li className="Timeline__item" key={period.time}>
        <p className="Timeline__item__label">
          <button className="Timeline__item__label__button"></button>
          <span><strong>{period.time}</strong> is a cheap time to do washing</span>
          <span className="Timeline__item__label__cost"><strong>{period.averageCost}</strong>p/kWh</span>
        </p>
        </li>)}
    </ul>
  </div>
);

CheapestPeriods.propTypes = {
  periods: PropTypes.array.isRequired,
  isTomorrow: PropTypes.bool,
};

export default CheapestPeriods;
