"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Clock, MonitorOff } from "lucide-react"
import { cn } from "@/lib/utils"

export function CallAvailability() {
    const [status, setStatus] = React.useState<string>("unknown")

    return (
        <Card className="h-full flex flex-col p-4 border-muted hover:border-sidebar-primary/20 transition-colors shadow-sm bg-card/50 gap-2">
            <div className="flex items-center justify-between pb-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Availability</h3>
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <Button
                    variant="ghost"
                    className={cn(
                        "justify-start px-3 h-10 rounded-xl transition-all",
                        status === 'free'
                            ? "bg-green-500/10 text-green-700 dark:text-green-300 ring-1 ring-green-500/20"
                            : "bg-muted/30 hover:bg-muted text-muted-foreground"
                    )}
                    onClick={() => setStatus('free')}
                >
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-xs font-medium">Free Now</span>
                </Button>
                <Button
                    variant="ghost"
                    className={cn(
                        "justify-start px-3 h-10 rounded-xl transition-all",
                        status === 'later'
                            ? "bg-orange-500/10 text-orange-700 dark:text-orange-300 ring-1 ring-orange-500/20"
                            : "bg-muted/30 hover:bg-muted text-muted-foreground"
                    )}
                    onClick={() => setStatus('later')}
                >
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-xs font-medium">Later Today</span>
                </Button>
            </div>
        </Card>
    )
}
