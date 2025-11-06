import { useQuery } from '@tanstack/react-query'
import httpClient from '@/lib/axios'

export type Order = {
  id: number
  table: string
  status: string
  total: number
  created_at?: string
}

async function fetchActiveOrders(): Promise<Order[]> {
  const { data } = await httpClient.get('/api/orders/active')
  return data as Order[]
}

export function useActiveOrders() {
  return useQuery({
    queryKey: ['orders.active'],
    queryFn: fetchActiveOrders,
    refetchOnWindowFocus: false,
  })
}


