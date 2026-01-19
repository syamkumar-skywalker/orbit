"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smile, Frown, Meh, CloudRain } from "lucide-react"

export function DailyCheckIn() {
    const [selectedMood, setSelectedMood] = React.useState<string | null>(null)

    const moods = [
        { id: "happy", icon: Smile, label: "Good" },
        { id: "meh", icon: Meh, label: "Okay" },
        { id: "sad", icon: Frown, label: "Low" },
        { id: "overwhelmed", icon: CloudRain, label: "Heavy" },
    ]

    return (
        <Card className="h-full flex flex-col justify-between p-4 border-muted hover:border-sidebar-primary/20 transition-colors shadow-sm bg-card/50">
            <div className="flex items-center justify-between pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pulse Check</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 h-full">
                {moods.map((m) => (
                    <Button
                        key={m.id}
                        variant="ghost"
                        onClick={() => setSelectedMood(m.id)}
                        className={`h-full flex-col gap-1 rounded-xl transition-all ${selectedMood === m.id
                                ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                                : "bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <m.icon className="w-5 h-5" strokeWidth={1.5} />
                        <span className="text-[10px] font-medium">{m.label}</span>
                    </Button>
                ))}
            </div>
        </Card>
    )
}
