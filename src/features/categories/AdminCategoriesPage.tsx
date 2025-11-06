import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import httpClient from '@/lib/axios'
import { useCategories } from './useCategories'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table'

const schema = z.object({
  name: z.string().min(2, 'Nombre demasiado corto'),
})

type FormValues = z.infer<typeof schema>

export default function AdminCategoriesPage() {
  const { data, isLoading } = useCategories()
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '' },
  })

  const createMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const { data } = await httpClient.post('/api/admin/categories', values)
      return data
    },
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  return (
    <div>
      <h2 className="text-xl font-semibold">Categorías</h2>
      <p className="text-muted-foreground mt-2">ABM de categorías</p>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Crear categoría</h3>
        <form onSubmit={handleSubmit(values => createMutation.mutate(values))} className="flex gap-2">
          <input className="w-64 rounded-md border px-3 py-2" placeholder="Nombre" {...register('name')} />
          <Button type="submit" disabled={isSubmitting || createMutation.isPending}>Crear</Button>
        </form>
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Creado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow><TableCell colSpan={3}>Cargando...</TableCell></TableRow>
            )}
            {!isLoading && data?.length === 0 && (
              <TableRow><TableCell colSpan={3}>Sin categorías</TableCell></TableRow>
            )}
            {data?.map(cat => (
              <TableRow key={cat.id}>
                <TableCell>{cat.id}</TableCell>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.created_at ?? '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


