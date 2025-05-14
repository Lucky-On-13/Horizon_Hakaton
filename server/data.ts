"use server";

import db from "@/prisma/prisma";
import { UUID } from "crypto";

export async function subscribeParents(data: any) {
    return await db.user.create({
        data: {
    
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            telephone: data.telephone,
            password: data.password,
        }
    });
}


export async function getAllUsers() {
    return await db.user.findMany({
        select: {
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
            password: true,
        }
    });
}

export async function getUserByEmail(email: string) {
    return await db.user.findUnique({
        where: {
            email: email,
        },
    });
}

