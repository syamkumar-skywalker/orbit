"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { LifeBuoy } from "lucide-react"
import Link from "next/link"

export function ToolsWidget() {
    return (
        <Link href="/tools" className="h-full">
            <Card className="h-full bg-teal-50 border-teal-100 dark:bg-card dark:border-border hover:bg-teal-100 dark:hover:bg-accent/50 transition-colors cursor-pointer flex items-center justify-center">
                <CardContent className="p-0 flex flex-col items-center gap-2 text-teal-700 dark:text-teal-400">
                    <LifeBuoy className="w-6 h-6" />
                    <span className="text-[10px]">Coping Tools</span>
                </CardContent>
            </Card>
        </Link>
    )
}
