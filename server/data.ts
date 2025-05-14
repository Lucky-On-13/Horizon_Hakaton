"use server";

import db from "@/prisma/prisma";
import { UUID } from "crypto";
import jwt from "jsonwebtoken";



const JWT_SECRET = process.env.JWT_SECRET || 'dfcghbjk,ljbhfvghjbkjl'

export async function subscribeUser(data: any) {
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



export async function connectUser(email: any, password: any) {
  if (!email || !password) {
    return { success: false, message: "Email et mot de passe requis" }
  }

  const user = await getUserByEmail(email)

  if (!user) {
    return { success: false, message: "Utilisateur introuvable" }
  }

  const isPasswordCorrect = user.password === password

  if (!isPasswordCorrect) {
    return { success: false, message: "Mot de passe incorrect" }
  }

  // Générer le token JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role, // optionnel
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  )

  return {
    success: true,
    message: "Connexion réussie",
    user,
    token, // <-- à renvoyer côté client pour le stocker en cookie
  }
}

// export async function connectUser( email:any, password:any) {
//   if (!email || !password) {
//     return { success: false, message: "Email et mot de passe requis" };
//   }

//   const user = await getUserByEmail(email);

//   if (!user) {
//     return { success: false, message: "Utilisateur introuvable" };
//   }

//   const isPasswordCorrect = user.password === password;

//   if (!isPasswordCorrect) {
//     return { success: false, message: "Mot de passe incorrect" };
//   }

//   return {
//     success: true,
//     message: "Connexion réussie",
//     user,
//   };
// }



export async function getAllUsers() {
    return await db.user.findMany();
}

export async function getUserByEmail(email: string) {
  const data = await db.user.findUnique({
    select:{
      id:true,
      password:true,
      nom:true,
      prenom:true,
      role:true,
      email:true,
      telephone:true,
      createdAt:true,
      updatedAt:true
    },
      where: {
          email: email,
      },
  });
    return data;
}

