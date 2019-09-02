import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

class MedalChart extends Component {
  state = {
    data: this.props.data,
    loading: false,
    error: false,
    errorMessage: ''
  };

  render() {
    const renderCustomXLabel = ({ x, y, payload }) => {
      return (
        <text x={x} y={y + 10} fill="#666" textAnchor="middle">{`Sprint ${
          payload.value
        }`}</text>
      );
    };

    return (
      <LineChart
        width={500}
        height={300}
        data={this.state.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <XAxis
          dataKey="sprint_number"
          padding={{ left: 30, right: 30 }}
          tick={renderCustomXLabel}
        />
        <YAxis padding={{ top: 30, bottom: 30 }} allowDecimals={false} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="total_medal"
          stroke="#8884d8"
          name="Total Medal Acquired"
        />
        <Tooltip
          labelFormatter={function(value) {
            return `Sprint ${value}`;
          }}
        />
        <Legend />
      </LineChart>
    );
  }
}
export default MedalChart;
