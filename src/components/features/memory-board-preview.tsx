"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"
import Link from "next/link"

export function MemoryBoardPreview() {
    return (
        <Link href="/board">
            <Card className="bg-card w-full h-48 relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/30" />
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2 text-primary">
                        <Heart className="w-4 h-4 fill-primary/20" />
                        Memory Board
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-muted-foreground text-sm italic">
                        "Small wins count. Always."
                    </div>
                    {/* Soft background decor */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                </CardContent>
            </Card>
        </Link>
    )
}
