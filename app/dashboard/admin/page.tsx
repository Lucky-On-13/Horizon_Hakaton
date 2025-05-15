'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Utilisateurs', value: 45, color: 'bg-blue-500' },
    { label: 'Secrétaires', value: 8, color: 'bg-green-500' },
    { label: 'Analystes', value: 12, color: 'bg-yellow-500' },
    { label: 'Admins', value: 3, color: 'bg-purple-500' }
  ]

  return (
    <div className="min-h-screen pt-24 pb-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#006B3F]">Administration</h1>
            <p className="text-gray-600">Gestion des utilisateurs et paramètres système</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              href="/admin/users/create" 
              className="inline-flex items-center px-4 py-2 bg-[#FF8B7B] text-white rounded-md hover:bg-[#FF7B6B] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Nouvel utilisateur
            </Link>
          </div>
        </div>
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-white`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{stat.value}</h2>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gestion des utilisateurs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-[#006B3F]">Gestion des utilisateurs</h2>
          </div>
          
          {/* Filtres et recherche */}
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
              />
              <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006B3F]">
                <option value="">Tous les rôles</option>
                <option value="secretaire">Secrétaire</option>
                <option value="analyste">Analyste</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          
          {/* Tableau des utilisateurs */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de création
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Contenu du tableau */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paramètres système */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-[#006B3F]">Paramètres système</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Configuration générale</h3>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nom de l'application
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                    defaultValue="Fondation Horizons Nouveaux"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Notifications</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-[#006B3F] focus:ring-[#006B3F]" />
                    <span className="text-sm text-gray-700">Activer les notifications par email</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-[#006B3F] text-white rounded-md hover:bg-[#005535] transition-colors">
                Sauvegarder les paramètres
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}