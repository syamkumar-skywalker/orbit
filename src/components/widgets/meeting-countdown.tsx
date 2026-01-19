"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, CalendarHeart } from "lucide-react"
import { motion } from "framer-motion"

export function MeetingCountdown() {
    // Persistent Date State
    const [targetDateStr, setTargetDateStr] = React.useState<string>("2026-05-01")
    const [isEditing, setIsEditing] = React.useState(false)
    const [daysLeft, setDaysLeft] = React.useState(0)

    React.useEffect(() => {
        const saved = localStorage.getItem('orbit-meeting-date')
        if (saved) setTargetDateStr(saved)
    }, [])

    React.useEffect(() => {
        const target = new Date(targetDateStr)
        const today = new Date()
        const diffTime = target.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        setDaysLeft(diffDays) // Can be negative if passed
    }, [targetDateStr])

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTargetDateStr(e.target.value)
        localStorage.setItem('orbit-meeting-date', e.target.value)
    }

    // Percentage for progress bar (assuming 100 days max for demo visual, or calculate based on set range)
    const progress = Math.max(0, Math.min(100, (100 - daysLeft)))

    return (
        <Card className="h-full flex flex-col p-4 border-muted hover:border-primary/30 transition-colors shadow-sm bg-card/50 overflow-hidden relative group">
            <div className="flex items-center justify-between pb-4 z-10 w-full">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-primary transition-colors" onClick={() => setIsEditing(!isEditing)}>
                    <CalendarHeart className="w-3 h-3 text-primary" />
                    {isEditing ? "Set Date" : "Until we meet"}
                </h3>
                {isEditing ? (
                    <input
                        type="date"
                        value={targetDateStr}
                        onChange={handleDateChange}
                        className="text-[10px] bg-white/50 border rounded px-1 py-0.5 outline-none text-primary font-bold"
                        onBlur={() => setIsEditing(false)}
                        autoFocus
                    />
                ) : (
                    <span
                        onClick={() => setIsEditing(true)}
                        className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full cursor-pointer hover:bg-primary/20 transition-colors"
                    >
                        {daysLeft > 0 ? `${daysLeft} days` : daysLeft === 0 ? "Today!" : "Met!"}
                    </span>
                )}
            </div>

            <div className="flex-1 flex flex-col justify-center gap-6 z-10">
                {/* The Love Bar */}
                <div className="relative w-full h-3 bg-secondary/30 rounded-full">
                    {/* Liquid Progress */}
                    <motion.div
                        className="absolute left-0 top-0 h-full bg-linear-to-r from-pink-300 to-purple-300 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: "anticipate" }}
                    />

                    {/* Hello Kitty (Left) */}
                    <div className="absolute -left-2 -top-5 filter drop-shadow-md z-20">
                        <div className="w-12 h-12 bg-white rounded-full p-1 shadow-sm border border-secondary/20 overflow-hidden transform -scale-x-100 transition-transform hover:scale-110 hover:-scale-x-110 duration-300">
                            <img
                                src="/hk-plush.png"
                                alt="Hello Kitty"
                                className="w-full h-full object-cover scale-110"
                            />
                        </div>
                    </div>

                    {/* Daniel Star (Right) */}
                    <div className="absolute -right-2 -top-5 filter drop-shadow-md z-20">
                        <div className="w-12 h-12 bg-white rounded-full p-1 shadow-sm border border-secondary/20 overflow-hidden transition-transform hover:scale-110 duration-300">
                            <img
                                src="/daniel-plush.png"
                                alt="Daniel Star"
                                className="w-full h-full object-cover scale-110" // scale up slightly to hide any white borders if needed
                            />
                        </div>
                    </div>

                    {/* The Floating Heart (follows progress) */}
                    <motion.div
                        className="absolute -top-3 z-20"
                        initial={{ left: 0 }}
                        animate={{ left: `${progress}%` }}
                        transition={{ duration: 1.5, ease: "anticipate" }}
                    >
                        <div className="relative -ml-3 bg-white rounded-full p-1.5 shadow-sm border border-pink-100">
                            <Heart className="w-3.5 h-3.5 fill-primary text-primary animate-pulse" />
                        </div>
                    </motion.div>
                </div>

                <div className="text-center text-[10px] text-muted-foreground italic">
                    "Every second brings me closer to you."
                </div>
            </div>

            {/* Background Liquid Blob decoration */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-700" />
        </Card>
    )
}
