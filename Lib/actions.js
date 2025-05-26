'use server';

import prisma from "./prisma";

export async function addEat(user, eat) {
    if (!user || !eat) return null;

    await prisma.eat.create({
        data: {
            breakfast: eat.breakfast,
            lunch: eat.lunch,
            diner: eat.diner,
            snack: eat.snack,
            crisps: eat.crisps,
            nuts: eat.nuts,
            desert: eat.desert,
            icecream: eat.icecream,
            created: new Date(),
            userId: user.id,
        }
    });
    return true;
};

export async function addDrink(user, drink) {
    if (!user || !drink) return null;

    await prisma.drink.create({
        data: {
            beer: drink.beer,
            coffee: drink.coffee,
            cocktail: drink.cocktail,
            water: drink.water,
            softdrink: drink.softdrink,
            other: drink.other,
            created: new Date(),
            userId: user.id,
        }
    });
    return true;
};

export async function addActivity(user, activity) {
    if (!user || !activity) return null;

    await prisma.activity.create({
        data: {
            gaming: activity.gaming,
            music: activity.music,
            talking: activity.talking,
            swimming: activity.swimming,
            sports: activity.sports,
            sleep: activity.sleep,
            sailing: activity.sailing,
            annoying: activity.annoying,
            boring: activity.boring,
            sitting: activity.sitting,
            other: activity.other,
            created: new Date(),
            userId: user.id,
        }
    });
    return true;
};

export async function addOutput(user, output) {
    if (!user || !output) return null;

    await prisma.output.create({
        data: {
            piss: output.piss,
            shit: output.shit,
            throwup: output.throwup,
            bleeding: output.bleeding,
            other: output.other,
            created: new Date(),
            userId: user.id,
        }
    });
    return true;
};