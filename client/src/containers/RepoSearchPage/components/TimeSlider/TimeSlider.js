import 'rc-slider/assets/index.css';
import './TimeSlider.scss';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'rc-slider';
import { createTimeScale } from '../../utils/utils'

const Range = Slider.Range;

const TimeSlider = ({ onChange, hours, labels, defaultValue }) => (
  <div className="TimeSlider">
    <Range
      min={0}
      max={hours}
      trackStyle={[{ backgroundColor: '#fb1a80' }]}
      marks={createTimeScale(labels, hours)}
      allowCross={false}
      defaultValue={defaultValue}
      activeDotStyle={{backgroundColor: '#fb1a80'}}
      onChange={onChange} />
  </div>
);

TimeSlider.propTypes = {
  onChange: PropTypes.func.isRequired,
  hours: PropTypes.number.isRequired,
  labels: PropTypes.array.isRequired,
  defaultValue: PropTypes.array.isRequired,
};

export default TimeSlider;
