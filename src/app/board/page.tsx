"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BoardPage() {
    const cards = [
        { id: 1, text: "Relapse is a signal, not a verdict.", type: "truth" },
        { id: 2, text: "You are loved even on your hardest day.", type: "truth" },
        { id: 3, text: "Thinking of you right now.", type: "note" },
        { id: 4, text: "Small wins count. Always.", type: "truth" },
    ]

    return (
        <div className="container mx-auto max-w-md p-4 space-y-6 pb-20">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-primary">Memory Board</h1>
            </div>

            <div className="masonry-grid grid grid-cols-2 gap-3">
                {cards.map((card) => (
                    <Card key={card.id} className={`overflow-hidden ${card.type === 'truth' ? 'bg-primary/20 border-primary/30' : 'bg-card'}`}>
                        <CardContent className="p-4 text-sm font-medium leading-relaxed">
                            {card.text}
                        </CardContent>
                    </Card>
                ))}

                {/* Add Button */}
                <Button variant="outline" className="h-[100px] border-dashed border-2 flex flex-col gap-2">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Add Card</span>
                </Button>
            </div>
        </div>
    )
}
