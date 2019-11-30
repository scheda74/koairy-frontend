import React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';


export default function BremickerLineChart(props) {
  return (
    <LineChart width={500} height={300} data={props.data}>
      <XAxis dataKey="date" />
      <YAxis dataKey="value" />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
      <Line type="monotone" dataKey="time" stroke="#8884d8" />
      <Line type="monotone" dataKey="value" stroke="#82ca9d" />
    </LineChart>
  )
}