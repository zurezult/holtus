'use client';

import { useRouter } from 'next/navigation';
import { addUser } from "@/Lib/useractions";
import { toast } from 'sonner';

export default function AddUser() {

    const router = useRouter();
     const handleSubmit = async (formData) => {
         const user = await addUser(formData)
         if (user) {
             toast.success(`Gebruiker ${user.name} aangemaakt`)
             router.push('/')
         } else {
             toast.error('Aanmaken mislukt')
         }
     }


    const handleCancel = () => {
        router.push('/');
    };

    const handleInputChange = () => {

    };


    return (
        <main className="user-layout">
            <div className="user-image">
                <h1>
                    New User
                </h1>
                <img src='/img/man.png' width={300} />
            </div>
            <div className="user-form">
                <form action={handleSubmit} className="space-y-6">
                    <div className="user-form-field">
                        <label className="user-form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            // value={formData.name}
                            // onChange={handleInputChange}
                            className="user-form-input"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="user-form-field">
                        <label className="user-form-label">Age</label>
                        <input
                            type="number"
                            name="age"
                            // value={formData.age}
                            // onChange={handleInputChange}
                            className="user-form-input"
                            placeholder="Enter your age"
                        />
                    </div>
                    <div className="user-form-field">
                        <label className="user-form-label">Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            // value={formData.weight}
                            // onChange={handleInputChange}
                            className="user-form-input"
                            placeholder="Enter your weight"
                        />
                    </div>
                    <div className="user-form-field">
                        <label className="user-form-label">Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            // value={formData.height}
                            // onChange={handleInputChange}
                            className="user-form-input"
                            placeholder="Enter your height"
                        />
                    </div>
                    <div className="user-form-field">
                        <label className="user-form-label">Skin color</label>
                        <input
                            type="text"
                            name="skinColor"
                            // value={formData.skinColor}
                            // onChange={handleInputChange}
                            className="user-form-input"
                            placeholder="Enter your skin color"
                        />
                    </div>
                    <div className="user-form-buttons">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="user-form-button cancel"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="user-form-button submit"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}