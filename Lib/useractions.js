'use server';

import prisma from "./prisma";

export async function addUser(formData) {
    if(!formData) return null;
    const user = await prisma.user.create({
        data: {
            name: formData.get("name"),
            age: Number(formData.get("age")),
            weight: Number(formData.get("weight")),
            height: Number(formData.get('height')),
            skinColor: formData.get('skinColor')
        },
    });
    if(user) return user;
};

