import { useQuery } from '@tanstack/react-query'
import httpClient from '@/lib/axios'

export type Category = {
  id: number
  name: string
  created_at?: string
  updated_at?: string
}

async function fetchCategories(): Promise<Category[]> {
  const { data } = await httpClient.get('/api/categories')
  return data as Category[]
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })
}


