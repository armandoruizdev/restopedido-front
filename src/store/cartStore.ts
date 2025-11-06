import { create } from 'zustand'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  updateItemQuantity: (id: string, quantity: number) => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item, quantity = 1) => {
    const existing = get().items.find(i => i.id === item.id)
    if (existing) {
      set({ items: get().items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i) })
    } else {
      set({ items: [...get().items, { ...item, quantity }] })
    }
  },
  removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
  updateItemQuantity: (id, quantity) => set({ items: get().items.map(i => i.id === id ? { ...i, quantity } : i) }),
}))


