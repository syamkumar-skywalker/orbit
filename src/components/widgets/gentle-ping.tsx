"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Sun } from "lucide-react"

export function GentlePing() {
    const [lastPing, setLastPing] = React.useState<string | null>(null)

    const sendPing = (type: string) => {
        setLastPing(type)
        setTimeout(() => setLastPing(null), 2000)
    }

    return (
        <Card className="h-full flex flex-col p-3 border-muted hover:border-sidebar-primary/20 transition-colors shadow-sm bg-card/50 gap-1.5 overflow-hidden">
            <div className="flex items-center justify-between pb-0.5">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Signals</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
                <Button
                    variant="ghost"
                    className="h-full flex-col gap-1 rounded-lg bg-primary/5 hover:bg-primary/10 text-primary border border-transparent hover:border-primary/20 transition-all px-0"
                    onClick={() => sendPing('miss_you')}
                >
                    <Heart className={`w-4 h-4 ${lastPing === 'miss_you' ? 'fill-primary animate-ping' : ''}`} strokeWidth={1.5} />
                    <span className="text-[9px] font-bold text-center leading-tight">Miss<br />You</span>
                </Button>
                <Button
                    variant="ghost"
                    className="h-full flex-col gap-1 rounded-lg bg-purple-500/5 hover:bg-purple-500/10 text-purple-600 border border-transparent hover:border-purple-500/20 transition-all px-0"
                    onClick={() => sendPing('need_space')}
                >
                    <Sun className={`w-4 h-4 ${lastPing === 'need_space' ? 'animate-pulse' : ''}`} strokeWidth={1.5} />
                    <span className="text-[9px] font-bold text-center leading-tight">Need<br />Space</span>
                </Button>
            </div>
        </Card>
    )
}
