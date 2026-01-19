"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CalendarClock } from "lucide-react"
import Link from "next/link"

export function SchedulePreview() {
    return (
        <Link href="/schedule">
            <Card className="bg-card w-full h-40 relative group hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2 text-secondary-foreground">
                        <CalendarClock className="w-4 h-4" />
                        Next Call
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-semibold text-foreground">
                        Maybe later tonight?
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                        Your window: 8 PM - 10 PM
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
