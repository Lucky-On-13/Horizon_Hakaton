'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulation d'authentification (à remplacer par une vraie API)
      if (email === 'admin@horizon.org' && password === 'admin123') {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Stocker les informations de l'utilisateur dans localStorage
        localStorage.setItem('user', JSON.stringify({
          id: '1',
          nom: 'Admin',
          prenom: 'Système',
          email: 'admin@horizon.org',
          role: 'admin'
        }))
        
        router.push('/dashboard')
      } else if (email === 'secretaire@horizon.org' && password === 'secret123') {
        await new Promise(resolve => setTimeout(resolve, 1000))
        localStorage.setItem('user', JSON.stringify({
          id: '2',
          nom: 'Dupont',
          prenom: 'Marie',
          email: 'secretaire@horizon.org',
          role: 'secretaire'
        }))
        router.push('/dashboard')
      } else if (email === 'analyste@horizon.org' && password === 'analyse123') {
        await new Promise(resolve => setTimeout(resolve, 1000))
        localStorage.setItem('user', JSON.stringify({
          id: '3',
          nom: 'Martin',
          prenom: 'Jean',
          email: 'analyste@horizon.org',
          role: 'analyste'
        }))
        router.push('/dashboard')
      } else if (email === 'parent@example.com' && password === 'parent123') {
        await new Promise(resolve => setTimeout(resolve, 1000))
        localStorage.setItem('user', JSON.stringify({
          id: '4',
          nom: 'Parent',
          prenom: 'Test',
          email: 'parent@example.com',
          role: 'parent'
        }))
        router.push('/dossiers')
      } else {
        setError('Identifiants incorrects')
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              <Image 
                src="/images/logo.png" 
                alt="Logo Fondation Horizons Nouveaux" 
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#006B3F]">Connexion</h2>
          <p className="mt-2 text-sm text-gray-600">
            Accédez à votre espace personnel
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Adresse email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F] focus:z-10 sm:text-sm"
                placeholder="Adresse email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F] focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#006B3F] focus:ring-[#006B3F] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Se souvenir de moi
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#FF8B7B] hover:text-[#FF7B6B]">
                Mot de passe oublié?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#006B3F] hover:bg-[#005535] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006B3F] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Vous n'avez pas de compte?{' '}
            <Link href="/auth/register" className="font-medium text-[#FF8B7B] hover:text-[#FF7B6B]">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}