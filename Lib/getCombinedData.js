import  prisma  from '@/Lib/prisma';

const moodFields = ['happy', 'cheerful', 'tired', 'naughty', 'horny', 'hungry', 'hungover', 'drunk'];
const activityFields = ['gaming','music','talking','swimming','sports','sleep','sailing','annoying','boring','sitting','other'];
const drinkFields = ['beer','coffee','cocktail','water','softdrink','other'];
const eatFields = ['breakfast','lunch','diner','snack','crisps','nuts','desert','icecream'];
const outputFields = ['piss','shit','throwup','bleeding'];

function getHourKey(date) {
  const d = new Date(date);
  d.setMinutes(0, 0, 0);
  return d.toISOString();
}

function forwardFill(data, fields) {
  let prev = {};
  return data.map(entry => {
    const filled = { ...entry };
    fields.forEach(f => {
      if (entry[f] === null || entry[f] === undefined) {
        filled[f] = prev[f] ?? 0;
      } else {
        filled[f] = entry[f];
      }
    });
    prev = filled;
    return filled;
  });
}

export async function getCombinedData() {
  const [moods, activities, drinks, eats, outputs] = await Promise.all([
    prisma.mood.findMany({ orderBy: { created: 'asc' } }),
    prisma.activity.findMany({ orderBy: { created: 'asc' } }),
    prisma.drink.findMany({ orderBy: { created: 'asc' } }),
    prisma.eat.findMany({ orderBy: { created: 'asc' } }),
    prisma.output.findMany({ orderBy: { created: 'asc' } }),
  ]);

  const buckets = {};

  const processEntries = (entries, fields, isAverage = false) => {
    for (const entry of entries) {
      const key = getHourKey(entry.created);
      if (!buckets[key]) buckets[key] = { time: key };
      for (const f of fields) {
        if (!buckets[key][f]) buckets[key][f] = 0;
        buckets[key][f] += entry[f];
      }
      if (isAverage) {
        if (!buckets[key].__count) buckets[key].__count = 0;
        buckets[key].__count++;
      }
    }
  };

  processEntries(moods, moodFields, true);
  processEntries(activities, activityFields);
  processEntries(drinks, drinkFields);
  processEntries(eats, eatFields);
  processEntries(outputs, outputFields);

  let data = Object.values(buckets).sort((a, b) => new Date(a.time) - new Date(b.time));

  for (const entry of data) {
    if (entry.__count) {
      for (const f of moodFields) {
        entry[f] = Math.round(entry[f] / entry.__count);
      }
      delete entry.__count;
    }
  }

  data = forwardFill(data, moodFields);

  return data;
}
