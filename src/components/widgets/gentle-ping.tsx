"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Sun } from "lucide-react"
import { useOrbitData } from "@/hooks/use-orbit-data"

export function GentlePing() {
    const { recentPing, actions } = useOrbitData()
    const { sendPing } = actions

    // Local ephemeral state for animation feedback
    const [lastSentPing, setLastSentPing] = React.useState<string | null>(null)

    const handleSendPing = async (type: string) => {
        setLastSentPing(type)
        setTimeout(() => setLastSentPing(null), 2000)
        await sendPing(type)
    }

    return (
        <Card className="h-full flex flex-col p-4 border-muted hover:border-sidebar-primary/20 transition-colors shadow-sm bg-card/50 gap-2 relative overflow-hidden">
            {/* Received Ping Overlay */}
            {recentPing && (
                <div className="absolute inset-0 z-20 bg-background/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
                    <div className="flex flex-col items-center gap-2 animate-bounce">
                        {recentPing.type === 'miss_you' && <Heart className="w-12 h-12 text-primary fill-primary" />}
                        {recentPing.type === 'hug' && <span className="text-4xl">🫂</span>}
                        {recentPing.type === 'proud' && <span className="text-4xl">🌟</span>}
                        {recentPing.type === 'no_reply' && <span className="text-4xl">👀</span>}
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Received!</span>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between pb-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Signals</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1">
                <Button
                    variant="ghost"
                    className="h-full flex-col gap-1.5 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary border border-transparent hover:border-primary/20 transition-all"
                    onClick={() => handleSendPing('miss_you')}
                >
                    <Heart className={`w-5 h-5 ${lastSentPing === 'miss_you' ? 'fill-primary animate-ping' : ''}`} strokeWidth={1.5} />
                    <span className="text-[10px] font-medium">Miss You</span>
                </Button>
                <Button
                    variant="ghost"
                    className="h-full flex-col gap-1.5 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 text-purple-600 border border-transparent hover:border-purple-500/20 transition-all"
                    onClick={() => handleSendPing('need_space')}
                >
                    <Sun className={`w-5 h-5 ${lastSentPing === 'need_space' ? 'animate-pulse' : ''}`} strokeWidth={1.5} />
                    <span className="text-[10px] font-medium">Need Space</span>
                </Button>
            </div>
        </Card>
    )
}
