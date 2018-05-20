import React from 'react';
import PropTypes from 'prop-types';
import 'react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

const buildAxis = (graphData) => {
  const numberOfHours = 5;
  const axis = []
  for (var i = 0; i < graphData.length; i++) {
    if (i % numberOfHours == 0) {
      const datum = graphData[i];
      axis.push(datum.x.getTime())
    }
  }
  return axis;
}

const Chart = ({ graphData }) => (
  <div>
    <XYPlot
      width={600}
      height={300}
        >
        <XAxis
            tickValues={buildAxis(graphData)}
            tickFormat={(d) => {
              var date = new Date(0)
              date.setUTCMilliseconds(d)
              return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            }}
            />
        <YAxis/>
      <LineSeries
        xType='time'
        data={graphData}

        />

    </XYPlot>
  </div>
);

Chart.propTypes = {
  graphData: PropTypes.array.isRequired,
};

export default Chart;
