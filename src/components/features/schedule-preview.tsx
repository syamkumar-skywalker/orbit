"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CalendarClock } from "lucide-react"
import Link from "next/link"

export function SchedulePreview() {
    const [status, setStatus] = React.useState<string>("Maybe later tonight?")
    const [time, setTime] = React.useState<string>("Your window: 8 PM - 10 PM")
    const [isEditing, setIsEditing] = React.useState(false)

    React.useEffect(() => {
        if (localStorage.getItem('orbit-sched-status')) setStatus(localStorage.getItem('orbit-sched-status')!)
        if (localStorage.getItem('orbit-sched-time')) setTime(localStorage.getItem('orbit-sched-time')!)
    }, [])

    const handleSave = (type: 'status' | 'time', val: string) => {
        if (type === 'status') {
            setStatus(val)
            localStorage.setItem('orbit-sched-status', val)
        } else {
            setTime(val)
            localStorage.setItem('orbit-sched-time', val)
        }
    }

    return (
        <Card className="bg-card w-full h-40 relative group hover:shadow-md transition-shadow cursor-pointer">
            <Link href="/schedule" className="absolute inset-0 z-0" />
            <CardHeader className="pb-2 relative z-10 pointer-events-none">
                <CardTitle className="text-lg font-medium flex items-center gap-2 text-secondary-foreground">
                    <CalendarClock className="w-4 h-4" />
                    Next Call
                </CardTitle>
            </CardHeader>
            <CardContent className="relative z-20">
                {isEditing ? (
                    <div className="flex flex-col gap-2">
                        <input
                            value={status}
                            onChange={(e) => handleSave('status', e.target.value)}
                            className="text-2xl font-semibold text-foreground bg-transparent border-none focus:ring-0 p-0 w-full"
                            placeholder="Status..."
                        />
                        <input
                            value={time}
                            onChange={(e) => handleSave('time', e.target.value)}
                            onBlur={() => setIsEditing(false)} // Close on blur of last item
                            className="text-sm text-muted-foreground bg-transparent border-none focus:ring-0 p-0 w-full"
                            placeholder="Time window..."
                        />
                    </div>
                ) : (
                    <div onClick={(e) => { e.preventDefault(); setIsEditing(true) }}>
                        <div className="text-2xl font-semibold text-foreground hover:opacity-75 transition-opacity">
                            {status}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 hover:text-foreground transition-colors">
                            {time}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
