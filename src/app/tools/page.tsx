"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Waves, Wind, Footprints, HeartHandshake } from "lucide-react"
import Link from "next/link"

export default function ToolsPage() {
    return (
        <div className="container mx-auto max-w-md p-4 space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-primary">Support Tools</h1>
            </div>

            <div className="grid gap-4">
                <ToolCard
                    icon={Waves}
                    title="Urge Surfing"
                    desc="Ride the wave of emotion. 3 minute timer."
                    color="blue"
                />
                <ToolCard
                    icon={Wind}
                    title="Breathe"
                    desc="4-7-8 Breathing Guide."
                    color="green"
                />
                <ToolCard
                    icon={Footprints}
                    title="Grounding"
                    desc="5-4-3-2-1 Technique."
                    color="orange"
                />
                <ToolCard
                    icon={HeartHandshake}
                    title="Comfort"
                    desc="Gentle reminders & validation."
                    color="pink"
                />
            </div>
        </div>
    )
}

function ToolCard({ icon: Icon, title, desc, color }: any) {
    const colorStyles: Record<string, string> = {
        blue: "bg-blue-50 border-blue-100 text-blue-800",
        green: "bg-green-50 border-green-100 text-green-800",
        orange: "bg-orange-50 border-orange-100 text-orange-800",
        pink: "bg-pink-50 border-pink-100 text-pink-800",
    }
    const style = colorStyles[color as string] || colorStyles.blue

    return (
        <Card className={`border ${style} hover:brightness-95 transition-all cursor-pointer`}>
            <div className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-full bg-white/50`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <p className="text-sm opacity-80">{desc}</p>
                </div>
            </div>
        </Card>
    )
}
