import { useQuery } from '@tanstack/react-query'
import httpClient from '@/lib/axios'

export type MenuItem = {
  id: number
  name: string
  price: number
  image_url?: string
}

async function fetchItems(categoryId?: number): Promise<MenuItem[]> {
  const { data } = await httpClient.get('/api/items', {
    params: categoryId ? { category_id: categoryId } : undefined,
  })
  return data as MenuItem[]
}

export function useItems(categoryId?: number) {
  return useQuery({
    queryKey: ['items', { categoryId: categoryId ?? null }],
    queryFn: () => fetchItems(categoryId),
  })
}


