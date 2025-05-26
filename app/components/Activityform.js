'use client';
import { useState } from 'react';
import Hexbutton from './hexbutton';
import { addActivity } from "@/Lib/actions";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export default function ActivityForm({ user, onToggle }) {
    const router = useRouter();
    const [show, setShow] = useState(false);

    const toggle = () => {
        setShow(!show);
        onToggle();
    }

    function log(type) {
        const data = {
            gaming: 0,
            music: 0,
            talking: 0,
            swimming: 0,
            sports: 0,
            sleep: 0,
            sailing: 0,
            annoying: 0,
            boring: 0,
            sitting: 0,
            other: 0,
            userId: user.id,
        };
        data[type] = 1;
        const response = addActivity(user, data);
        if (response) {
            toast.success('Activiteit opgeslagen');
            router.push('/')
        } else {
            toast.error('Activiteit, opslag mislukt...');
        }

    }

    return (
        <>
            {!show &&
                <Hexbutton onClick={toggle} text={'Activiteit'} />
            }
            {show &&
                <>
                    <h1>Activiteit</h1>
                    <div className="button-box">
                        <Hexbutton size="sm" onClick={() => log('gaming')} text={'spelleke'} />
                        <Hexbutton size="sm" onClick={() => log('music')} text={'muziek'} />
                        <Hexbutton size="sm" onClick={() => log('talking')} text={'praten'} />
                        <Hexbutton size="sm" onClick={() => log('swimming')} text={'zwemmen'} />
                        <Hexbutton size="sm" onClick={() => log('sports')} text={'sporten'} />
                        <Hexbutton size="sm" onClick={() => log('sleep')} text={'slapen'} />
                        <Hexbutton size="sm" onClick={() => log('sailing')} text={'zeilen'} />
                        <Hexbutton size="sm" onClick={() => log('annoying')} text={'irriteren'} />
                        <Hexbutton size="sm" onClick={() => log('boring')} text={'vervelen'} />
                        <Hexbutton size="sm" onClick={() => log('sitting')} text={'zitten'} />
                        <Hexbutton size="sm" onClick={() => log('other')} text={'anders'} />
                        
                    </div>
                    <div className='button-right'>
                        <button
                            type="button"
                            onClick={toggle}
                            className="user-form-button cancel">Cancel
                        </button>
                    </div>
                </>
            }
        </>

    );
}
