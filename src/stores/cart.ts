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
  totalQuantity: number
  totalPrice: number
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  clear: () => void
  setQuantity: (id: string, quantity: number) => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  addItem: (item, quantity = 1) => {
    const { items } = get()
    const existing = items.find(i => i.id === item.id)
    let nextItems: CartItem[]
    if (existing) {
      nextItems = items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i)
    } else {
      nextItems = [...items, { ...item, quantity }]
    }
    const totals = calcTotals(nextItems)
    set({ items: nextItems, ...totals })
  },
  removeItem: (id) => {
    const nextItems = get().items.filter(i => i.id !== id)
    const totals = calcTotals(nextItems)
    set({ items: nextItems, ...totals })
  },
  clear: () => set({ items: [], totalPrice: 0, totalQuantity: 0 }),
  setQuantity: (id, quantity) => {
    const nextItems = get().items.map(i => i.id === id ? { ...i, quantity } : i)
    const totals = calcTotals(nextItems)
    set({ items: nextItems, ...totals })
  }
}))

function calcTotals(items: CartItem[]) {
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  return { totalQuantity, totalPrice }
}


