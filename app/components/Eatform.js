'use client';
import { useState } from 'react';
import Hexbutton from './hexbutton';
import { addEat } from "@/Lib/actions";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export default function EatForm({ user, onToggle }) {
    const router = useRouter();
    const [show, setShow] = useState(false);

    const toggle = () => {
        setShow(!show);
        onToggle();
    }

    function logEat(type) {
        const data = {
            breakfast: 0,
            lunch: 0,
            diner: 0,
            snack: 0,
            crisps: 0,
            nuts: 0,
            desert: 0,
            icecream: 0,
            userId: user.id,
        };
        data[type] = 1;
        const response = addEat(user, data);
        if (response) {
            toast.success('Eten opgeslagen');
            router.push('/')
        } else {
            toast.error('Eten, opslag mislukt...');
        }
        
    }

    return (
        <>
            {!show &&
                <Hexbutton onClick={toggle} text={'Eten'} />
            }
            {show &&
                <>
                    <h1>Eten</h1>
                    <div className="button-box">
                        <Hexbutton size="sm" onClick={()=>logEat('breakfast')} text={'ontbijt'} />
                        <Hexbutton size="sm" onClick={()=>logEat('lunch')} text={'lunch'} />
                        <Hexbutton size="sm" onClick={()=>logEat('diner')} text={'avondeten'} />
                        <Hexbutton size="sm" onClick={()=>logEat('snack')} text={'snack'} />
                        <Hexbutton size="sm" onClick={()=>logEat('crisps')} text={'chips'} />
                        <Hexbutton size="sm" onClick={()=>logEat('nuts')} text={'nootjes'} />
                        <Hexbutton size="sm" onClick={()=>logEat('desert')} text={'nagerecht'} />
                        <Hexbutton size="sm" onClick={()=>logEat('icecream')} text={'ijsje'} />
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
