import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { text, author } = await request.json()
    
    const commentaire = await prisma.commentaire.create({
      data: {
        text,
        author, // Ce champ est requis selon votre schéma
        dossierId: parseInt(params.id),
        // Utiliser les noms de champs corrects selon votre schéma
        date: new Date(),
        dateModification: new Date()
      }
    })

    return NextResponse.json(commentaire)
  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout du commentaire' },
      { status: 500 }
    )
  }
}
