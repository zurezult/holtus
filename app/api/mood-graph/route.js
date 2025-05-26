// /api/mood-graph.js
import prisma from "@/Lib/prisma";
import { addHours, startOfHour } from 'date-fns';

const FIELDS = {
  mood: ['happy','cheerful','tired','naughty','horny','hungry','hungover','drunk'],
  activity: ['gaming','music','talking','swimming','sports','sleep','sailing','annoying','boring','sitting','other'],
  drink: ['beer','coffee','cocktail','water','softdrink','other'],
  eat: ['breakfast','lunch','diner','snack','crisps','nuts','desert','icecream'],
  output: ['piss','shit','throwup','bleeding']
};

export async function GET() {
  const [moods, activities, drinks, eats, outputs] = await Promise.all([
    prisma.mood.findMany({ orderBy: { created: 'asc' } }),
    prisma.activity.findMany(),
    prisma.drink.findMany(),
    prisma.eat.findMany(),
    prisma.output.findMany(),
  ]);

  const buckets = {};

  function put(bucket, created, fieldValues, type) {
    const hour = startOfHour(new Date(created)).toISOString();
    if (!bucket[hour]) bucket[hour] = { time: hour };
    for (const [key, value] of Object.entries(fieldValues)) {
      if (type === 'mood') {
        if (!bucket[hour][key]) bucket[hour][key] = { sum: 0, count: 0 };
        bucket[hour][key].sum += value;
        bucket[hour][key].count += 1;
      } else {
        bucket[hour][key] = (bucket[hour][key] || 0) + value;
      }
    }
  }

  moods.forEach(row => put(buckets, row.created, row, 'mood'));
  activities.forEach(row => put(buckets, row.created, row, 'total'));
  drinks.forEach(row => put(buckets, row.created, row, 'total'));
  eats.forEach(row => put(buckets, row.created, row, 'total'));
  outputs.forEach(row => put(buckets, row.created, row, 'total'));

  const times = Object.keys(buckets).sort();
  let lastMoodValues = {};
  const result = times.map(t => {
    const entry = { time: t };
    for (const key of FIELDS.mood) {
      const val = buckets[t][key];
      if (val?.count) {
        const avg = Math.round(val.sum / val.count);
        entry[key] = avg;
        lastMoodValues[key] = avg;
      } else {
        entry[key] = lastMoodValues[key] ?? 0;
      }
    }
    for (const key of [...FIELDS.activity, ...FIELDS.drink, ...FIELDS.eat, ...FIELDS.output]) {
      entry[key] = buckets[t][key] || 0;
    }
    return entry;
  });

  return Response.json(result);
}
