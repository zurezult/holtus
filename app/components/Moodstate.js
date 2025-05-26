'use client';
import { useState } from 'react';
import SliderComponent from './SliderComponent';


export default function MoodState({ moodstate }) {
    const [moods, setMoods] = useState(moodstate);

    return (
        <>
            {moods && <>
                <SliderComponent readOnly={true} title="Gelukkig" value={moods.happy} />
                <SliderComponent readOnly={true} title="Blij" value={moods.cheerful} />
                <SliderComponent readOnly={true} title="Baldadig" value={moods.naughty} />
                <SliderComponent readOnly={true} title="Geil" value={moods.horny} />
                <SliderComponent readOnly={true} title="Hongerig" value={moods.hungry} />
                <SliderComponent readOnly={true} title="Katerig" value={moods.hungover} />
                <SliderComponent readOnly={true} title="Moe" value={moods.tired} />
                <SliderComponent readOnly={true} title="Dronken" value={moods.drunk} />
                <h5>{moods.created.toString()}</h5>
            </>
            }
        </>

    );
}
