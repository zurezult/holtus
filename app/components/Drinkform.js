'use client';
import { useState } from 'react';
import Hexbutton from './hexbutton';
import { addDrink } from "@/Lib/actions";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export default function DrinkForm({ user, onToggle }) {
    const router = useRouter();
    const [show, setShow] = useState(false);

    const toggle = () => {
        setShow(!show);
        onToggle();
    }

    function log(type) {
        const data = {
            beer: 0,
            coffee: 0,
            cocktail: 0,
            water: 0,
            softdrink: 0,
            other: 0,
            userId: user.id,
        };
        data[type] = 1;
        const response = addDrink(user, data);
        if (response) {
            toast.success('Drinken opgeslagen');
            router.push('/')
        } else {
            toast.error('Drinken, opslag mislukt...');
        }

    }

    return (
        <>
            {!show &&
                <Hexbutton onClick={toggle} text={'Drank'} />
            }
            {show &&
                <>
                    <h1>Drinken</h1>
                    <div className="button-box">

                        <Hexbutton size="sm" onClick={() => log('beer')} text={'bier'} />
                        <Hexbutton size="sm" onClick={() => log('coffee')} text={'koffie'} />
                        <Hexbutton size="sm" onClick={() => log('cocktail')} text={'cocktail'} />
                        <Hexbutton size="sm" onClick={() => log('water')} text={'water'} />
                        <Hexbutton size="sm" onClick={() => log('softdrink')} text={'fris'} />
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
