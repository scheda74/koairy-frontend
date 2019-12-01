import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';


export default function HawaDawaLineChart(props) {
  return (
    <LineChart width={500} height={300} data={props.data}>
      <XAxis dataKey="date" />
      <YAxis dataKey="no2" />
      <Tooltip />
      <Legend verticalAlign="top" height={36}/>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
      <Line type="monotone" dataKey="pm10" stroke="#8884d8" />
      <Line type="monotone" dataKey="no2" stroke="#82ca9d" />
    </LineChart>
  )
}