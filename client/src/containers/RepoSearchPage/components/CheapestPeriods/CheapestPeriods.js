import React from 'react';
import PropTypes from 'prop-types';
import './CheapestPeriods.scss';
import cn from 'classname';

const formatPrice = (priceInPence) => priceInPence > 100 ? `£${(priceInPence/100).toFixed(2)}` : `${Math.round(priceInPence)}p`

const CheapestPeriods = ({ periods, isTomorrow }) => {
  return (
  <div className="CheapestPeriods">
    { isTomorrow && periods.length >0 && <h2 className="h4">Tomorrow</h2>}
    { !isTomorrow && periods.length >0 && <h2 className="h4">Today</h2>}

    <ul className="Timeline">
      {periods.map(period => <li className="Timeline__item" key={period.time}>
        <p className="Timeline__item__label">
          <button className={cn({
              'Timeline__item__label__button': true,
              'Timeline__item__label__button--car': period.id == 'car',
            })}></button>
          <span><strong>{period.time}</strong> is the cheapest time to {period.verbage}</span>
          <span className="Timeline__item__label__cost"><strong>{formatPrice(period.timeinHours*period.averageCost*period.kwPerHour)}</strong></span>
        </p>
        </li>)}
    </ul>
  </div>
)};

CheapestPeriods.propTypes = {
  periods: PropTypes.array.isRequired,
  isTomorrow: PropTypes.bool,
};

export default CheapestPeriods;
