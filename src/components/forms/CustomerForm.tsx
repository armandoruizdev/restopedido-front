import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre'),
  phone: z.string().min(6, 'Ingresa un teléfono válido'),
})

type FormValues = z.infer<typeof schema>

type Props = {
  onSubmit: (values: FormValues) => void
}

export default function CustomerForm({ onSubmit }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input className="mt-1 w-full rounded-md border px-3 py-2" {...register('name')} />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Teléfono</label>
        <input className="mt-1 w-full rounded-md border px-3 py-2" {...register('phone')} />
        {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="inline-flex items-center rounded-md bg-black px-4 py-2 text-white disabled:opacity-50">
        Continuar
      </button>
    </form>
  )
}


