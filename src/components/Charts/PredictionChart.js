import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';


export default function PredictionChart(props) {
  const pollutantNames = Object.keys(props.data[0]).filter(key => key !== "date");
  console.log('data', props.data);
  console.log('names ', pollutantNames);
  return (
    <LineChart width={450} height={280} data={props.data}>
      <XAxis dataKey="date" />
      <YAxis dataKey={props.maxKey} />
      <Tooltip />
      <Legend verticalAlign="top" height={36}/>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
      <Line type="monotone" dataKey={pollutantNames[0]} stroke="#8884d8" />
      <Line type="monotone" dataKey={pollutantNames[1]} stroke="#82ca9d" />
      <Line type="monotone" dataKey={pollutantNames[2]} stroke="#fff540" />
    </LineChart>
  )
}