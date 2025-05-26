'use client';
import { useState } from 'react';
import Hexbutton from './hexbutton';
import { addOutput } from "@/Lib/actions";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export default function OutputForm({ user, onToggle }) {
    const router = useRouter();
    const [show, setShow] = useState(false);

    const toggle = () => {
        setShow(!show);
        onToggle();
    }

    function log(type) {
        const data = {
            piss: 0,
            shit: 0,
            throwup: 0,
            bleeding: 0,
            userId: user.id,
        };
        data[type] = 1;
        const response = addOutput(user, data);
        if (response) {
            toast.success('Uitgifte opgeslagen');
            router.push('/')
        } else {
            toast.error('Uitgifte, opslag mislukt...');
        }

    }

    return (
        <>
            {!show &&
                <Hexbutton onClick={toggle} text={'Uitgifte'} />
            }
            {show &&
                <>
                    <h1>Uitgifte</h1>
                    <div className="button-box">
                        <Hexbutton size="sm" onClick={() => log('piss')} text={'pissen'} />
                        <Hexbutton size="sm" onClick={() => log('shit')} text={'schijten'} />
                        <Hexbutton size="sm" onClick={() => log('throwup')} text={'kotsen'} />
                        <Hexbutton size="sm" onClick={() => log('bleeding')} text={'bloeden'} />
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
