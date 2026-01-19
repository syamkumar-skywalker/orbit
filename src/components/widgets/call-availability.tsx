"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Clock, MonitorOff } from "lucide-react"
import { cn } from "@/lib/utils"

export function CallAvailability() {
    const [status, setStatus] = React.useState<string>("not_today")

    // Persist status
    React.useEffect(() => {
        const saved = localStorage.getItem('orbit-availability-status')
        if (saved) setStatus(saved)
    }, [])

    const handleSetStatus = (newStatus: string) => {
        setStatus(newStatus)
        localStorage.setItem('orbit-availability-status', newStatus)
        // In a real app + Supabase, we would upsert to 'profiles' table here
    }

    return (
        <Card className="h-full flex flex-col p-5 border-muted hover:border-sidebar-primary/20 transition-colors shadow-sm bg-card/50 gap-3">
            <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Availability</h3>
            </div>
            <div className="flex flex-col gap-2.5 flex-1">
                <Button
                    variant="ghost"
                    className={cn(
                        "justify-start px-4 h-11 rounded-2xl transition-all text-sm",
                        status === 'free'
                            ? "bg-green-500/10 text-green-700 dark:text-green-300 ring-1 ring-green-500/20 shadow-xs"
                            : "bg-muted/30 hover:bg-muted text-muted-foreground"
                    )}
                    onClick={() => handleSetStatus('free')}
                >
                    <Phone className="w-4 h-4 mr-3" />
                    <span className="font-semibold">Free Now</span>
                </Button>
                <Button
                    variant="ghost"
                    className={cn(
                        "justify-start px-4 h-11 rounded-2xl transition-all text-sm",
                        status === 'later'
                            ? "bg-orange-500/10 text-orange-700 dark:text-orange-300 ring-1 ring-orange-500/20 shadow-xs"
                            : "bg-muted/30 hover:bg-muted text-muted-foreground"
                    )}
                    onClick={() => handleSetStatus('later')}
                >
                    <Clock className="w-4 h-4 mr-3" />
                    <span className="font-semibold">Later Today</span>
                </Button>
                <Button
                    variant="ghost"
                    className={cn(
                        "justify-start px-4 h-11 rounded-2xl transition-all text-sm",
                        status === 'not_today'
                            ? "bg-red-500/10 text-red-700 dark:text-red-300 ring-1 ring-red-500/20 shadow-xs"
                            : "bg-muted/30 hover:bg-muted text-muted-foreground"
                    )}
                    onClick={() => handleSetStatus('not_today')}
                >
                    <MonitorOff className="w-4 h-4 mr-3" />
                    <span className="font-semibold">Not Today</span>
                </Button>
            </div>
        </Card>
    )
}
