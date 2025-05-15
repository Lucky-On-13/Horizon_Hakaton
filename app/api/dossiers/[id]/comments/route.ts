import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { text } = await request.json()
    
    const commentaire = await prisma.commentaire.create({
      data: {
        text,
        author: 'System User', // Add the required author field
        dossierId: parseInt(params.id),
        date: new Date()
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