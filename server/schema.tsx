import { UseFormReturn } from "react-hook-form";
import { z } from "zod";


export const fullSchema = z.object({
  
  nom: z
    .string({ required_error: 'Le prénom est requis.' })
    .min(1, { message: 'Le prénom ne peut pas être vide.' }),
  prenom: z
    .string({ required_error: 'Le nom est requis.' })
    .min(1, { message: 'Le nom ne peut pas être vide.' }),
  telephone: z
    .string({ required_error: 'Le numéro de téléphone est requis.' })
    .min(1, { message: 'Le numéro de téléphone ne peut pas être vide.' }),
    password: z
    .string({ required_error: 'Le mot de passe est requis.' }),

    email: z.string().email({ message: "L'adresse e-mail doit être valide." }),
});

export type subscribeInput = z.infer<typeof fullSchema>;

export type StepProps = {
  methods: UseFormReturn<subscribeInput>;
};
