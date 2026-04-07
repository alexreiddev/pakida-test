import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useMenu() {
  const [items, setItems]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMenu()
  }, [])

  async function fetchMenu() {
    setLoading(true)
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .order('category')
      .order('name')
    setItems(data || [])
    setLoading(false)
  }

  function byCategory(cat) {
    return items.filter(i => i.category === cat)
  }

  // Upsell: suggest Loaded Fries upgrade from Classic Fries
  function getUpsell(itemName) {
    if (itemName === 'Classic Fries') {
      return items.find(i => i.name === 'Loaded Fries')
    }
    return null
  }

  async function updateItem(id, updates) {
    const { data } = await supabase
      .from('menu_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    setItems(prev => prev.map(i => i.id === id ? data : i))
  }

  async function updateStock(id, delta) {
    const item = items.find(i => i.id === id)
    if (!item || item.stock === null) return  // unlimited
    const newStock = Math.max(0, (item.stock || 0) + delta)
    await updateItem(id, {
      stock: newStock,
      is_available: newStock > 0,
    })
  }

  return { items, loading, byCategory, getUpsell, updateItem, updateStock, refresh: fetchMenu }
}
