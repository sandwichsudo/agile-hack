import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheapestPeriods from '../CheapestPeriods/CheapestPeriods';
import TimeSlider from '../TimeSlider/TimeSlider';

class Timeline extends Component {
  constructor (props) {
    super(props)
    this.toggleSettings = this.toggleSettings.bind(this);
    this.state = {
      showSettings: false,
    }
  }

  toggleSettings () {
    this.setState({
      showSettings: !this.state.showSettings
    })
  }

  render () {
    const {
      cheapestHours,
      morningHours,
      afternoonHours,
      sliderChange,
      morningMinTime,
      morningMaxTime,
      afternoonMinTime,
      afternoonMaxTime,
    }  = this.props;
    return (<div>
        <button className="settingsButton" onClick={this.toggleSettings}>Show settings</button>
        { this.state.showSettings && <div>
          <h5>Morning</h5>
          <TimeSlider defaultValue={[morningMinTime, morningMaxTime]} hours={12} labels={morningHours} onChange={(value) => sliderChange('morning', value)}/>
          <h5>Afternoon</h5>
          <TimeSlider defaultValue={[afternoonMinTime, afternoonMaxTime]} hours={12} labels={afternoonHours} onChange={(value) => sliderChange('afternoon', value)}/>
          </div>}

        <CheapestPeriods periods={cheapestHours[0]} />
        <CheapestPeriods isTomorrow periods={cheapestHours[1]}/>
      </div>)
  }
}



const style = {
  color: 'white',
}

Timeline.defaultProps = {
  morningHours: ['12am', '2am','4am','6am', '8am', '10am', '12pm'],
  afternoonHours: ['12pm','2pm','4pm', '6pm', '8pm', '10pm', '12am'],
}

Timeline.propTypes = {
  cheapestHours: PropTypes.array.isRequired,
  morningMarks: PropTypes.object.isRequired,
  afternoonMarks: PropTypes.object.isRequired,

};

export default Timeline;
