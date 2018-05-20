import 'rc-slider/assets/index.css';
import './TimeSlider.scss';
import React from 'react';
import Slider from 'rc-slider';
import { createTimeScale } from '../../utils/utils'

const Range = Slider.Range;

const TimeSlider = ({ marks, onChange, hours, labels, defaultValue }) => (
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
};

export default TimeSlider;
