"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"
import Link from "next/link"

export function MemoryBoardPreview() {
    const [quote, setQuote] = React.useState<string>("\"Small wins count. Always.\"")
    const [isEditing, setIsEditing] = React.useState(false)

    React.useEffect(() => {
        const saved = localStorage.getItem('orbit-memory-quote')
        if (saved) setQuote(saved)
    }, [])

    const handleSave = (val: string) => {
        setQuote(val)
        localStorage.setItem('orbit-memory-quote', val)
    }

    return (
        <Card className="bg-card w-full h-48 relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
            <Link href="/board" className="absolute inset-0 z-0" /> {/* Link covers bg but inputs need higher z */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/30" />
            <CardHeader className="pb-2 relative z-10 pointer-events-none"> {/* Text non-interaction layer */}
                <CardTitle className="text-lg font-medium flex items-center gap-2 text-primary">
                    <Heart className="w-4 h-4 fill-primary/20" />
                    Memory Board
                </CardTitle>
            </CardHeader>
            <CardContent className="relative z-20">
                {isEditing ? (
                    <textarea
                        value={quote}
                        onChange={(e) => handleSave(e.target.value)}
                        onBlur={() => setIsEditing(false)}
                        autoFocus
                        className="w-full h-24 text-sm italic bg-transparent border-none resize-none focus:ring-0 p-0 text-muted-foreground"
                    />
                ) : (
                    <div
                        className="text-muted-foreground text-sm italic cursor-text hover:text-foreground transition-colors"
                        onClick={(e) => {
                            e.preventDefault() // prevent navigation
                            setIsEditing(true)
                        }}
                    >
                        {quote || "Click to add a quote..."}
                    </div>
                )}
                {/* Soft background decor */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            </CardContent>
        </Card>
    )
}
