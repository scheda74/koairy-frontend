import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function BremickerLineChart(props) {
  return (
    <ResponsiveContainer width="90%" height={280}>
      <LineChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }} data={props.data}>
        <XAxis dataKey="date" />
        <YAxis dataKey="vehicles" />
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="vehicles" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}