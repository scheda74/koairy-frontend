import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


export default function PredictionChart(props) {
  const pollutantNames = Object.keys(props.data[0]).filter(key => key !== "date");
  // console.log('data', props.data);
  // console.log('names ', pollutantNames);
  return (
    <ResponsiveContainer width="90%" height={280}>
      <LineChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }} data={props.data}>
        <XAxis dataKey="date" />
        <YAxis dataKey={props.maxKey} />
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey={pollutantNames[0]} stroke="#8884d8" />
        <Line type="monotone" dataKey={pollutantNames[1]} stroke="#82ca9d" />
        <Line type="monotone" dataKey={pollutantNames[2]} stroke="#fff540" />
      </LineChart>
    </ResponsiveContainer>
  )
}