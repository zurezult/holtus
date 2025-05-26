'use client';
import { useState } from 'react';
import Hexbutton from './hexbutton';
import { addPromilage } from "@/Lib/moodactions";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export default function PromilageForm({ user, onToggle }) {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [promilage, setPromilage] = useState({promilage:0.01});

    const toggle = () => {
        setShow(!show);
        onToggle();
    }

    const handleInputChange = (e) => {
    setPromilage({ promilage: parseFloat(e.target.value) || 0 });
};
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const response = addPromilage(user, promilage);
        if (response) {
            toast.success('Promilage opgeslagen');
            router.push('/')
        } else {
            toast.error('Promilage, opslag mislukt...');
        }

    };

    return (
        <>
            {!show &&
                <Hexbutton onClick={toggle} text={'Promilage'} />
            }
            {show &&
               <form onSubmit={handleSubmit} >
                    <h1>Promilage</h1>
                    <div className="button-box">
                        <div className="user-form-field">
                        <label className="user-form-label">Promilage</label>
                        <input
                            type="number"
                            name="promilage"
                            value={promilage.promilage}
                            onChange={handleInputChange}
                            className="user-form-input"
                            placeholder="Enter your promilage"
                            step="0.01"
                        />
                    </div>
                    </div>
                    <div className='button-right'>
                        <button
                            type="button"
                            onClick={toggle}
                            className="user-form-button cancel">Cancel
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
