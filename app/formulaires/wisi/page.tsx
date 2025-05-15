'use client'


import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ZodObject, ZodString, ZodEnum, ZodEffects, ZodTypeAny } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { wisiSchema } from '@/server/schema';
import {  submitWisiForm } from '@/server/data';


export default function WISIFormStepper() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    adresse: '',
    telephone: '',
    email: '',
    typeHandicap: '',
    niveauEtude: '',
    situationFamiliale: '',
    nombreEnfants: '',
    profession: '',
    revenuMensuel: '',
    besoins: ''
  })


  // Utilisation de Zod pour la validation
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(wisiSchema),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

const wiziSubmit = async (data: any) => {
  try {
    const res = await fetch('/api/wisi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const json = await res.json()

    if (json.success) {
      alert('Formulaire soumis avec succès !')
    } else {
      alert(json.error || 'Erreur lors de la soumission.')
    }
  } catch (e) {
    console.error('Erreur wisi', e)
    alert("Une erreur est survenue")
  }
}




  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)



  return (

    <div className='h-screen flex-col justify-center items-center pt-25'>
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-12">
      <h1 className="text-3xl font-bold text-[#006B3F] text-center mb-2">Formulaire WISI</h1>
      <p className="text-gray-600 text-center mb-6">Étape {step} sur 3</p>

      <form onSubmit={handleSubmit(wiziSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input {...register('nom')} name="nom" label="Nom" value={formData.nom} onChange={handleChange} />
            <Input {...register('prenom')} name="prenom" label="Prénom" value={formData.prenom} onChange={handleChange} />
            <Input {...register('dateNaissance')} name="dateNaissance" label="Date de naissance" type="date" value={formData.dateNaissance} onChange={handleChange} />
            <Input {...register('lieuNaissance')} name="lieuNaissance" label="Lieu de naissance" value={formData.lieuNaissance} onChange={handleChange} />
            <Input {...register('adresse')} name="adresse" label="Adresse" value={formData.adresse} onChange={handleChange} />
            <Input {...register('telephone')} name="telephone" label="Téléphone" type="tel" value={formData.telephone} onChange={handleChange} />
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input {...register('email')} name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
            <Select
            {...register('typeHandicap')}
              name="typeHandicap"
              label="Type de handicap"
              value={formData.typeHandicap}
              onChange={handleChange}
              options={[
                { value: '', label: 'Sélectionnez un type' },
                { value: 'moteur', label: 'Handicap moteur' },
                { value: 'visuel', label: 'Handicap visuel' },
                { value: 'auditif', label: 'Handicap auditif' },
                { value: 'mental', label: 'Handicap mental' },
                { value: 'autre', label: 'Autre' }
              ]}
            />
            <Input {...register('niveauEtude')} name="niveauEtude" label="Niveau d'étude" value={formData.niveauEtude} onChange={handleChange} />
            <Select
            {...register('situationFamiliale')}
              name="situationFamiliale"
              label="Situation familiale"
              value={formData.situationFamiliale}
              onChange={handleChange}
              options={[
                { value: '', label: 'Sélectionnez une situation' },
                { value: 'celibataire', label: 'Célibataire' },
                { value: 'marie', label: 'Marié(e)' },
                { value: 'divorce', label: 'Divorcé(e)' },
                { value: 'veuf', label: 'Veuf/Veuve' }
              ]}
            />
            <Input {...register('nombreEnfants')} name="nombreEnfants" label="Nombre d'enfants" type="number" value={formData.nombreEnfants} onChange={handleChange} />
            <Input {...register('profession')} name="profession" label="Profession" value={formData.profession} onChange={handleChange} />
          </div>
        )}

        {step === 3 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input {...register('revenuMensuel')} name="revenuMensuel" label="Revenu mensuel" type="number" value={formData.revenuMensuel} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Besoins spécifiques</label>
              <textarea
              {...register('besoins')}
                name="besoins"
                value={formData.besoins}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#006B3F] focus:ring-[#006B3F]"
                placeholder="Décrivez vos besoins spécifiques..."
                required
              />
            </div>
          </>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Précédent
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto bg-[#006B3F] text-white py-2 px-6 rounded-lg hover:bg-[#005535]"
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto bg-[#006B3F] text-white py-2 px-6 rounded-lg hover:bg-[#005535]"
            >
              Soumettre
            </button>
          )}
        </div>
      </form>
    </div>
    </div>
  )
}

function Input({ label, name, value, onChange, type = 'text' }: any) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#006B3F] focus:ring-[#006B3F]"
        required
      />
    </div>
  )
}

function Select({ label, name, value, onChange, options }: any) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#006B3F] focus:ring-[#006B3F]"
        required
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

