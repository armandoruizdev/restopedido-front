import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cartStore'

type Props = {
  id: number
  name: string
  price: number
  imageUrl?: string
}

export default function ItemCard({ id, name, price, imageUrl }: Props) {
  const addItem = useCartStore(s => s.addItem)
  return (
    <div className="rounded-lg border p-4">
      {imageUrl && (
        <img src={imageUrl} alt={name} className="mb-3 h-32 w-full object-cover rounded" />
      )}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-muted-foreground">${price.toFixed(2)}</p>
        </div>
        <Button onClick={() => addItem({ id: String(id), name, price, imageUrl })}>Añadir</Button>
      </div>
    </div>
  )
}


