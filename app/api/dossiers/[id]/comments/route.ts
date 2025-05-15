import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export default async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { text } = await request.json()
    
    const commentaire = await prisma.commentaire.create({
      data: {
        text,
        dossierId: parseInt(params.id),
        dateCreation: new Date(),
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
