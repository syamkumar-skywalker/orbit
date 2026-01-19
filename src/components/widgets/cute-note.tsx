"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export function CuteNote() {
    const [note, setNote] = React.useState("")

    const handleSend = () => {
        if (!note.trim()) return
        console.log("Note sent:", note)
        setNote("")
    }

    return (
        <Card className="h-full flex flex-col p-4 border-muted hover:border-sidebar-primary/20 transition-colors shadow-sm bg-card/50 gap-2">
            <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Note</h3>
            </div>
            <Textarea
                placeholder="Share a thought..."
                className="flex-1 min-h-0 resize-none text-sm bg-muted/20 border-transparent focus:bg-background focus:ring-0 p-2 leading-relaxed selection:bg-primary/20"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={140}
            />
            <div className="flex justify-end">
                <Button
                    size="icon"
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                    onClick={handleSend}
                    disabled={!note.trim()}
                >
                    <Send className="w-3 h-3" />
                </Button>
            </div>
        </Card>
    )
}
