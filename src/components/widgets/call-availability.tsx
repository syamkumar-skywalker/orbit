"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Clock, MonitorOff } from "lucide-react"
import { cn } from "@/lib/utils"

export function CallAvailability() {
    const [status, setStatus] = React.useState<string>("not_today")

    return (
        <Card className="h-full flex flex-col p-4 border-muted hover:border-sidebar-primary/20 transition-colors shadow-sm bg-card/50 gap-2">
            <div className="flex items-center justify-between pb-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Availability</h3>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
                <Button
                    variant="ghost"
                    className={cn(
                        "justify-start px-3 h-8 rounded-xl transition-all text-[11px]",
                        status === 'free'
                            ? "bg-green-500/10 text-green-700 dark:text-green-300 ring-1 ring-green-500/20"
                            : "bg-muted/30 hover:bg-muted text-muted-foreground"
                    )}
                    onClick={() => setStatus('free')}
                >
                    <Phone className="w-3.5 h-3.5 mr-2" />
                    <span className="font-medium">Free Now</span>
                </Button>
                <Button
                    variant="ghost"
                    className={cn(
                        "justify-start px-3 h-8 rounded-xl transition-all text-[11px]",
                        status === 'later'
                            ? "bg-orange-500/10 text-orange-700 dark:text-orange-300 ring-1 ring-orange-500/20"
                            : "bg-muted/30 hover:bg-muted text-muted-foreground"
                    )}
                    onClick={() => setStatus('later')}
                >
                    <Clock className="w-3.5 h-3.5 mr-2" />
                    <span className="font-medium">Later Today</span>
                </Button>
                <Button
                    variant="ghost"
                    className={cn(
                        "justify-start px-3 h-8 rounded-xl transition-all text-[11px]",
                        status === 'not_today'
                            ? "bg-red-500/10 text-red-700 dark:text-red-300 ring-1 ring-red-500/20"
                            : "bg-muted/30 hover:bg-muted text-muted-foreground"
                    )}
                    onClick={() => setStatus('not_today')}
                >
                    <MonitorOff className="w-3.5 h-3.5 mr-2" />
                    <span className="font-medium">Not Today</span>
                </Button>
            </div>
        </Card>
    )
}
