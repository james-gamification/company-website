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

class PercentageChart extends Component {
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

    const renderCustomYLabel = ({ x, y, payload }) => {
      return (
        <text x={x - 20} y={y + 5} fill="#666" textAnchor="middle">{`${
          payload.value
        } %`}</text>
      );
    };
    const CustomTooltip = ({ active, payload, label }) => {
      if (active) {
        return (
          <div className="custom-tooltip">
            <p className="label">{`Sprint ${label}`}</p>
            <p className="desc">{`Task completed: ${payload[0].value.toFixed(
              2
            )}%`}</p>
            <p className="desc">{`Meeting attended: ${payload[1].value.toFixed(
              2
            )}%`}</p>
          </div>
        );
      }

      return null;
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
        <YAxis padding={{ top: 30 }} tick={renderCustomYLabel} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="task_percentage"
          stroke="#8884d8"
          name="Task completed percentage"
        />
        <Line
          type="monotone"
          dataKey="meeting_percentage"
          stroke="#82ca9d"
          name="Meeting attended percentage"
        />
        <Tooltip
          formatter={function(value, name) {
            return `${value.toFixed(2)}%`;
          }}
          labelFormatter={function(value) {
            return `Sprint ${value}`;
          }}
        />
        <Legend />
      </LineChart>
    );
  }
}
export default PercentageChart;
