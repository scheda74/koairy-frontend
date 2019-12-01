import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';


export default function BremickerLineChart(props) {
  return (
    <LineChart width={500} height={300} data={props.data}>
      <XAxis dataKey="date" />
      <YAxis dataKey="vehicles" />
      <Tooltip />
      <Legend verticalAlign="top" height={36}/>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
      <Line type="monotone" dataKey="vehicles" stroke="#82ca9d" />
    </LineChart>
  )
}