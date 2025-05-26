'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const moodFields = ['happy','cheerful','tired','naughty','horny','hungry','hungover','drunk'];
const activityFields = ['gaming','music','talking','swimming','sports','sleep','sailing','annoying','boring','sitting','other'];
const drinkFields = ['beer','coffee','cocktail','water','softdrink','other'];
const eatFields = ['breakfast','lunch','diner','snack','crisps','nuts','desert','icecream'];
const outputFields = ['piss','shit','throwup','bleeding'];

const moodColors = ['#ff00f3','#ff7f0e','#2aff00','#d62728','#b200ff','#8c564b','#f3a7c2','#ffff7f'];
const drinkColors = ['#00ffff','#0077ff','#3399ff','#66ccff','#99ddff','#cceeff'];
const eatColors = ['#ffcc00','#ff9900','#ff6600','#ff3300','#cc0000','#990000','#660000','#330000'];

export default function CombinedGraph({ data }) {
  return (
    <ResponsiveContainer width={"100%"} height={600}>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" tickFormatter={v => new Date(v).getHours() + ":00"} stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff' }} />
        <Legend />

        {moodFields.map((field, i) => (
          <Line key={field} type="monotone" dataKey={field} stroke={moodColors[i % moodColors.length]} strokeWidth={2} dot={false} />
        ))}

        {drinkFields.map((field, i) => (
          <Line key={field} type="monotone" dataKey={field} stroke={drinkColors[i % drinkColors.length]} strokeDasharray="5 5" strokeWidth={1} dot={false} />
        ))}

        {eatFields.map((field, i) => (
          <Line key={field} type="monotone" dataKey={field} stroke={eatColors[i % eatColors.length]} strokeDasharray="3 3" strokeWidth={1} dot={false} />
        ))}

        {/* Je kunt dezelfde aanpak herhalen voor activityFields en outputFields met aparte kleuren indien gewenst */}
      </LineChart>
    </ResponsiveContainer>
  );
}
't'