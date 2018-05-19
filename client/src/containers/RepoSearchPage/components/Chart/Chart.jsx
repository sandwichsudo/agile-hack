import React from 'react';
import PropTypes from 'prop-types';
import 'react-vis/dist/style.css';
import {d3} from 'd3-time-format';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

const Chart = ({ graphData }) => (
  <div>
    <XYPlot
      width={300}
      height={300}>
      <HorizontalGridLines />
      <LineSeries
        xType='time'
        xTickFormat={d3.timeFormat("%Y-%m-%d")}
        data={graphData}

        />
      <XAxis />
      <YAxis />
    </XYPlot>
  </div>
);

Chart.propTypes = {
  graphData: PropTypes.array.isRequired,
};

export default Chart;
