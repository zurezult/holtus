'use server';

import prisma from "./prisma";

export async function addMood(user, mood) {
    if (!user || !mood) return null;

    await prisma.mood.create({
        data: {
            happy: mood.happy,
            cheerful: mood.cheerful,
            tired: mood.tired,
            naughty: mood.naughty,
            horny: mood.horny,
            hungry: mood.hungry,
            hungover: mood.hungover,
            drunk: mood.drunk,
            created: new Date(),
            userId: user.id,
        }
    });
    return true;
};

export async function addPromilage(user, promilage) {
    if (!user || !promilage) return null;

    await prisma.promilage.create({
        data: {
            promilage: promilage.promilage,
            created: new Date(),
            userId: user.id,
        }
    });
    return true;
};