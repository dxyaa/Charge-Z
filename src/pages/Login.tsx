"use client"
import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '@/app/firebase';
import "tailwindcss/tailwind.css";
import Autocomplete from '@/components/autocomplete';

interface Login {
    id: string;
    Name: string;
    Car: string;
}

export default function Login() {
    const [formData, setFormData] = useState<Login>({
        id: "",
        Name: "",
        Car: "",
    });

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const addUserData = async () => {
        try {
            const db = getFirestore(app);
            const userCollectionRef = collection(db, 'Users');

            const userData = {
                Name: formData.Name,
                Car: formData.Car
            };

            const docRef = await addDoc(userCollectionRef, userData);
            console.log('Document ID:', docRef.id); // Log the generated document ID
        } catch (error) {
            console.error('Error adding user data:', error);
        }
    };

    const handleSelect = (selectedName: string) => {
        setFormData((prevData) => ({
            ...prevData,
            Car: selectedName
        }));
    };

    return (
        <>
            <div className='flex flex-col h-full gap-lg-5 border-2 lg:w-1/2 align-self-lg-center ml-32'>
                <div>
                    <input
                        type="text"
                        name="Name"
                        className='w-full'
                        onChange={(e) => handleFormData(e)}
                        value={formData.Name}
                        placeholder='Name'
                    />
                </div>
                <Autocomplete onSelect={handleSelect} />
                <button onClick={addUserData}>Add User</button>
            </div>
        </>
    );
}
