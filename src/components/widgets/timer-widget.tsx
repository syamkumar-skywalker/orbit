"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

export function TimerWidget() {
    const [timeLeft, setTimeLeft] = React.useState(0) // seconds
    const [isActive, setIsActive] = React.useState(false)

    React.useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            setIsActive(false)
        }
        return () => { if (interval) clearInterval(interval) }
    }, [isActive, timeLeft])

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    const startTimer = (min: number) => {
        setTimeLeft(min * 60)
        setIsActive(true)
    }

    return (
        <Card className="h-full flex flex-col p-4 border-muted hover:border-sidebar-primary/20 transition-colors shadow-sm bg-card/50">
            <div className="flex items-center justify-between pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Focus</h3>
                {timeLeft > 0 && (
                    <span className="text-xs font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        {formatTime(timeLeft)}
                    </span>
                )}
            </div>

            <div className="flex-1 flex flex-col justify-center gap-2">
                {timeLeft === 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" onClick={() => startTimer(5)} className="h-8 text-xs">5m</Button>
                        <Button variant="outline" size="sm" onClick={() => startTimer(25)} className="h-8 text-xs">25m</Button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full w-8 h-8"
                            onClick={() => setIsActive(!isActive)}
                        >
                            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full w-8 h-8 text-muted-foreground hover:text-destructive"
                            onClick={() => { setIsActive(false); setTimeLeft(0); }}
                        >
                            <RotateCcw className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    )
}
