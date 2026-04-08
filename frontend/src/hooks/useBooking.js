import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function getDepositAmount(partySize) {
  if (partySize <= 2) return 100
  if (partySize <= 4) return 200
  return 300
}

export function useBooking() {
  const [bookings, setBookings] = useState([])

  async function fetchPlayerBookings(playerId) {
    const { data } = await supabase
      .from('bookings')
      .select('*, tables(name)')
      .eq('player_id', playerId)
      .order('booking_date', { ascending: false })
    setBookings(data || [])
    return data || []
  }

  async function getAvailableSlots(date, partySize) {
    // Get tables that fit the party size
    const { data: tables } = await supabase
      .from('tables')
      .select('*')
      .gte('capacity', partySize)
      .order('id')

    // Get existing confirmed bookings for this date
    const { data: existing } = await supabase
      .from('bookings')
      .select('table_id, time_slot')
      .eq('booking_date', date)
      .in('status', ['pending', 'confirmed'])

    const bookedMap = {}
    ;(existing || []).forEach(b => {
      const key = `${b.table_id}-${b.time_slot}`
      bookedMap[key] = true
    })

    // Generate hourly slots 14:00–23:00
    const slots = []
    for (let h = 14; h <= 23; h++) {
      const time = `${String(h).padStart(2, '0')}:00`
      const availableTables = (tables || []).filter(t => !bookedMap[`${t.id}-${time}`])
      slots.push({ time, availableTables })
    }
    return slots
  }

  async function createBooking({ playerId, tableId, date, timeSlot, partySize, isCorporate, companyName, notes }) {
    const depositAmount = getDepositAmount(partySize)

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        player_id: playerId,
        table_id: tableId,
        booking_date: date,
        time_slot: timeSlot,
        party_size: partySize,
        deposit_amount: depositAmount,
        is_corporate: isCorporate || false,
        company_name: companyName || null,
        notes: notes || null,
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error
    setBookings(prev => [data, ...prev])
    return data
  }

  async function cancelBooking(bookingId) {
    const { data: booking } = await supabase
      .from('bookings')
      .select('booking_date, time_slot, deposit_amount')
      .eq('id', bookingId)
      .single()

    const slotTime = new Date(`${booking.booking_date}T${booking.time_slot}`)
    const now = new Date()
    const hoursUntilSlot = (slotTime - now) / (1000 * 60 * 60)
    const isForfeited = hoursUntilSlot < 4

    await supabase.from('bookings').update({
      status: 'cancelled',
      cancelled_at: now.toISOString(),
      deposit_forfeited: isForfeited,
    }).eq('id', bookingId)

    setBookings(prev => prev.map(b => b.id === bookingId
      ? { ...b, status: 'cancelled', deposit_forfeited: isForfeited }
      : b
    ))

    return { isForfeited, depositAmount: booking.deposit_amount }
  }

  return { bookings, fetchPlayerBookings, getAvailableSlots, createBooking, cancelBooking }
}

export function useAllBookings(date) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => { fetchAll() }, [date])

  async function fetchAll() {
    setLoading(true)
    let query = supabase
      .from('bookings')
      .select('*, players(name, phone), tables(name)')
      .order('booking_date')
      .order('time_slot')

    if (date) query = query.eq('booking_date', date)

    const { data } = await query
    setBookings(data || [])
    setLoading(false)
  }

  async function updateStatus(id, status) {
    await supabase.from('bookings').update({ status }).eq('id', id)
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  return { bookings, loading, updateStatus, refresh: fetchAll }
}
