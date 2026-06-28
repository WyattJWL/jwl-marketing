import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, message, service } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }

  // Option 1 : Brevo API
  // Option 2 : Formspree (gratuit sans CB)
  // Pour l'instant on log et retourne succès
  // En prod : ajouter BREVO_API_KEY dans .env.local
  console.log('Nouveau contact:', { name, email, service, message })

  return NextResponse.json({ success: true })
}
