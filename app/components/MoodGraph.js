'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const fields = ['happy', 'cheerful', 'tired', 'naughty', 'horny', 'hungry', 'hungover', 'drunk'];
const labels = ['Gelukkig', 'Blij', 'Moe', 'Baldadig', 'Geil', 'Honger', 'Kater', 'Dronken'];
const colors = [
  '#ff00f3',
  '#ff7f0e',
  '#2aff00',
  '#d62728',
  '#b200ff',
  '#8c564b',
  '#f3a7c2',
  '#ffff7f'
];

export default function MoodGraph({ data }) {
  return (
    <ResponsiveContainer width={1000} height={600}>
      <LineChart data={data}>
        <CartesianGrid stroke="#fff" />
        <XAxis
          dataKey="time"
          tick={{ fill: '#fff' }}
          tickFormatter={(v) => new Date(v).getHours() + ':00'}
        />
        <YAxis
          tick={{ fill: '#fff' }}
        />
        <Tooltip 
        contentStyle={{ backgroundColor: '#222', color: '#fff' }}/>
        <Legend />
        {fields.map((field, index) => (
          <Line
            key={field}
            type="monotone"
            dataKey={field}
            name={labels[index]}
            stroke={colors[index % colors.length]}
            strokeWidth={3}
            dot={true}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}


