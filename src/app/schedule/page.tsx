"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function SchedulePage() {
    return (
        <div className="container mx-auto max-w-md p-4 space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-secondary-foreground">Schedule</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Today's Windows</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-full min-h-[40px] bg-green-200 rounded-full" />
                        <div>
                            <div className="font-semibold">Call Window</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Clock className="w-3 h-3" /> 8:00 PM - 10:00 PM
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-full min-h-[40px] bg-orange-200 rounded-full" />
                        <div>
                            <div className="font-semibold">Uni / Work</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Clock className="w-3 h-3" /> 9:00 AM - 5:00 PM
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Sync to Calendar
            </Button>
        </div>
    )
}
