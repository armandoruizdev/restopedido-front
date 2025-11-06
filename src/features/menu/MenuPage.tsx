import { useState } from 'react'
import { useCategories } from '@/features/categories/useCategories'
import { useItems } from './useItems'
import { Button } from '@/components/ui/button'
import ItemCard from './ItemCard'

export default function MenuPage() {
  const { data: categories } = useCategories()
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined)
  const { data: items, isLoading } = useItems(selectedCategory)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold">Menú</h1>
      <p className="text-muted-foreground mt-2">Selecciona una categoría para ver ítems.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant={selectedCategory === undefined ? 'default' : 'secondary'} onClick={() => setSelectedCategory(undefined)}>Todas</Button>
        {categories?.map(c => (
          <Button key={c.id} variant={selectedCategory === c.id ? 'default' : 'secondary'} onClick={() => setSelectedCategory(c.id)}>
            {c.name}
          </Button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {isLoading && <div>Cargando...</div>}
        {!isLoading && items?.map(i => (
          <ItemCard key={i.id} id={i.id} name={i.name} price={i.price} imageUrl={i.image_url} />
        ))}
      </div>
    </div>
  )
}


