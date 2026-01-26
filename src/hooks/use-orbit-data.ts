"use client"

import * as React from "react"
import { supabase, isLocalMode } from "@/lib/supabase"
import { RealtimeChannel } from "@supabase/supabase-js"

export interface UserProfile {
    id: string
    display_name: string | null
    status: 'online' | 'offline' | 'away'
    partner_id: string | null
}

export interface CheckIn {
    id: string
    user_id: string
    mood: string
    energy_level: number | null
    tags: string[] | null
    created_at: string
}

export interface Note {
    id: string
    user_id: string
    content: string
    is_read: boolean
    created_at: string
}

export interface Ping {
    id: string
    sender_id: string
    type: 'miss_you' | 'hug' | 'proud' | 'no_reply'
    created_at: string
}

export function useOrbitData() {
    const [user, setUser] = React.useState<any>(null)
    const [profile, setProfile] = React.useState<UserProfile | null>(null)
    const [partnerProfile, setPartnerProfile] = React.useState<UserProfile | null>(null)
    const [todayCheckIn, setTodayCheckIn] = React.useState<CheckIn | null>(null)
    const [latestNote, setLatestNote] = React.useState<Note | null>(null)
    const [recentPing, setRecentPing] = React.useState<Ping | null>(null)
    const [loading, setLoading] = React.useState(true)

    // Initial Data Fetch
    React.useEffect(() => {
        if (isLocalMode) {
            setLoading(false)
            return
        }

        const fetchData = async () => {
            try {
                const { data: { user } } = await supabase!.auth.getUser()
                if (!user) return
                setUser(user)

                // Fetch Profile
                const { data: profileData } = await supabase!
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (profileData) {
                    setProfile(profileData)
                    if (profileData.partner_id) {
                        const { data: partnerData } = await supabase!
                            .from('profiles')
                            .select('*')
                            .eq('id', profileData.partner_id)
                            .single()
                        setPartnerProfile(partnerData)
                    }
                }

                // Fetch Today's Check-in
                const today = new Date().toISOString().split('T')[0]
                const { data: checkins } = await supabase!
                    .from('checkins')
                    .select('*')
                    .eq('user_id', user.id)
                    .gte('created_at', today)
                    .order('created_at', { ascending: false })
                    .limit(1)

                if (checkins && checkins.length > 0) {
                    setTodayCheckIn(checkins[0])
                }

                // Fetch Latest Unread Note (from OTHER user)
                // In a real app we'd filter by sender != me, but for now just get latest
                const { data: notes } = await supabase!
                    .from('notes')
                    .select('*')
                    .eq('is_read', false)
                    .order('created_at', { ascending: false })
                    .limit(1)

                if (notes && notes.length > 0) {
                    setLatestNote(notes[0])
                }

            } catch (error) {
                console.error("Error fetching Orbit data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // Realtime Subscriptions
    React.useEffect(() => {
        if (isLocalMode || !user) return

        const channel = supabase!.channel('orbit_realtime')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'pings' },
                (payload) => {
                    const newPing = payload.new as Ping
                    if (newPing.sender_id !== user.id) {
                        setRecentPing(newPing)
                        // Auto-clear ping after 5 seconds
                        setTimeout(() => setRecentPing(null), 5000)
                    }
                }
            )
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'notes' },
                (payload) => {
                    const newNote = payload.new as Note
                    if (newNote.user_id !== user.id) {
                        setLatestNote(newNote)
                    }
                }
            )
            .subscribe()

        return () => {
            supabase!.removeChannel(channel)
        }
    }, [user])

    // Actions
    const sendPing = async (type: string) => {
        if (isLocalMode) return
        await supabase!.from('pings').insert({
            sender_id: user.id,
            type
        })
    }

    const saveCheckIn = async (mood: string) => {
        if (isLocalMode) return

        // Optimistic update
        const fakeCheckin = {
            id: 'temp', user_id: user.id, mood, energy_level: null, tags: null, created_at: new Date().toISOString()
        }
        setTodayCheckIn(fakeCheckin)

        await supabase!.from('checkins').insert({
            user_id: user.id,
            mood
        })
    }

    const sendNote = async (content: string) => {
        if (isLocalMode) return
        await supabase!.from('notes').insert({
            user_id: user.id,
            content
        })
    }

    return {
        user,
        profile,
        partnerProfile,
        todayCheckIn,
        latestNote,
        recentPing,
        loading,
        actions: {
            sendPing,
            saveCheckIn,
            sendNote
        }
    }
}
