'use client';
import { useState} from 'react';
import SliderComponent from './SliderComponent';
import Hexbutton from './hexbutton';
import { addMood } from "@/Lib/moodactions";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export default function MoodForm({ user, latestMood, onToggle}) {
    const router = useRouter();
    const [show, setShow] = useState(false);

    const [moods, setMoods] = useState(latestMood || {
        happy: 50,
        cheerful: 50,
        naughty: 50,
        tired: 50,
        horny: 50,
        hungry: 50,
        hungover: 50,
        drunk: 50,
    });

    const handleChange = (key) => (e) => {
        setMoods({ ...moods, [key]: Number(e.target.value) });
    };

    const handleCancel = () => {
        router.push('/');
    };

    const toggle = () => {
        setShow(!show);
        onToggle();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const response = addMood(user, moods);
        if (response) {
            toast.success(`Mood opgeslagen`)
            router.push('/')
        } else {
            toast.error('Mood opslag mislukt...')
        }

    };

    return (
        <>
            {!show &&
                <Hexbutton onClick={toggle} text={'Gevoel'} />
            }
            {show &&
                <form onSubmit={handleSubmit} >
                    <h1>Gevoelens</h1>
                    <SliderComponent title="Gelukkig" value={moods.happy} onChange={handleChange('happy')} />
                    <SliderComponent title="Blij" value={moods.cheerful} onChange={handleChange('cheerful')} />
                    <SliderComponent title="Baldadig" value={moods.naughty} onChange={handleChange('naughty')} />
                    <SliderComponent title="Geil" value={moods.horny} onChange={handleChange('horny')} />
                    <SliderComponent title="Hongerig" value={moods.hungry} onChange={handleChange('hungry')} />
                    <SliderComponent title="Katerig" value={moods.hungover} onChange={handleChange('hungover')} />
                    <SliderComponent title="Moe" value={moods.tired} onChange={handleChange('tired')} />
                    <SliderComponent title="Dronken" value={moods.drunk} onChange={handleChange('drunk')} />

                    <div className="user-form-buttons">
                        <button
                            type="button"
                            onClick={toggle}
                            className="user-form-button cancel"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="user-form-button submit"
                        >
                            Opslaan
                        </button>
                    </div>

                </form>
            }
        </>

    );
}
