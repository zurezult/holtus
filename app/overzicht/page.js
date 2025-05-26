import { subHours, formatISO, parseISO } from 'date-fns';
import prisma from "@/Lib/prisma";
import MoodState from "@/app/components/Moodstate";
import Hexbutton from '@/app/hexbutton';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import MoodGraph from '../components/MoodGraph';

export default async function Overzicht() {

    const allMoods = await prisma.mood.findMany({
        orderBy: { created: 'asc' }
    });

    const fields = [
        'happy',
        'cheerful',
        'tired',
        'naughty',
        'horny',
        'hungry',
        'hungover',
        'drunk'
    ];

    const total = Object.fromEntries(fields.map(f => [f, 0]));

    for (const mood of allMoods) {
        for (const f of fields) {
            total[f] += mood[f];
        }
    }

    const count = allMoods.length;
    const average = Object.fromEntries(
        fields.map(f => [f, Math.round(total[f] / count)])
    );
    average.created = new Date();

    // per uur:
    // stap 1: groepeer per uur
    const grouped = {};
    for (const mood of allMoods) {
        const hour = formatISO(new Date(mood.created).setMinutes(0, 0, 0));
        grouped[hour] ??= [];
        grouped[hour].push(mood);
    }

    // stap 2: bepaal tijdspanne
    const times = Object.keys(grouped).sort();
    const first = parseISO(times[0]);
    const last = parseISO(times[times.length - 1]);
    const hours = [];

    for (let d = first; d <= last; d = new Date(d.getTime() + 3600_000)) {
        hours.push(formatISO(new Date(d.setMinutes(0, 0, 0))));
    }

    // stap 3: bouw per uur een object met gemiddeldes (forward fill)
    const result = [];
    let lastValues = Object.fromEntries(fields.map(f => [f, 0]));

    for (const hour of hours) {
        const moods = grouped[hour];
        if (moods) {
            const sum = Object.fromEntries(fields.map(f => [f, 0]));
            for (const m of moods) {
                fields.forEach(f => {
                    sum[f] += m[f];
                });
            }
            const avg = Object.fromEntries(
                fields.map(f => [f, Math.round(sum[f] / moods.length)])
            );
            lastValues = avg;
        }

        result.push({
            time: hour,
            ...lastValues
        });
    }




    return (
        <main>
            <div className="user-layout">
                <Hexbutton link="/" text="Terug" size="sm" Icon={ArrowLeftIcon}>
                </Hexbutton>
            </div>
            <h1>
                Overzicht
            </h1>
            {/* <MoodState moodstate={average} /> */}
            <div className="dark">
                <MoodGraph data={result} />
            </div>

        </main>
    );
}
