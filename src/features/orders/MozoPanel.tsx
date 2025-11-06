import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useActiveOrders } from './useActiveOrders'
import socket from '@/lib/socket'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table'

export default function MozoPanel() {
  const { data, isLoading } = useActiveOrders()
  const queryClient = useQueryClient()

  useEffect(() => {
    function onEvent(payload: any) {
      // Si quieres actualizar manualmente, puedes usar setQueryData
      // Por simplicidad, invalidamos para refetch
      queryClient.invalidateQueries({ queryKey: ['orders.active'] })
    }

    socket.on('orders.active', onEvent)
    return () => {
      socket.off('orders.active', onEvent)
    }
  }, [queryClient])

  return (
    <div>
      <h2 className="text-xl font-semibold">Pedidos Activos</h2>
      <p className="text-muted-foreground mt-2">Actualización en tiempo real.</p>
      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Mesa</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow><TableCell colSpan={4}>Cargando...</TableCell></TableRow>
            )}
            {!isLoading && data?.length === 0 && (
              <TableRow><TableCell colSpan={4}>Sin pedidos activos</TableCell></TableRow>
            )}
            {data?.map(o => (
              <TableRow key={o.id}>
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.table}</TableCell>
                <TableCell>{o.status}</TableCell>
                <TableCell>${o.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


