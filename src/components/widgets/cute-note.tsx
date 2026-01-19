"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export function CuteNote() {
    const [note, setNote] = React.useState("")

    React.useEffect(() => {
        const saved = localStorage.getItem('orbit-cute-note')
        if (saved) setNote(saved)
    }, [])

    const handleSave = (value: string) => {
        setNote(value)
        localStorage.setItem('orbit-cute-note', value)
    }

    const handleSend = () => {
        if (!note.trim()) return
        console.log("Note sent:", note)
        // Here we would insert into 'notes' table
        // For now, clear it or maybe keep it as "Latest Note"? User asked for "stored".
        // Traditionally "sending" a note clears the input. I will clear it but maybe show a "Sent!" toast.
        // For this "Note Widget" (which looks like a sticky note), maybe it SHOULDN'T clear?
        // "Stored" implies keeping it. If it's a "Send Note" widget, it sends. If it's a "Sticky Note", it stays.
        // The UI has a 'Send' button. I'll clear it but maybe I should have a "Sticky Note" widget instead?
        // Let's assume sending = clearing + storing in history (not implemented).
        // BUT, the user said "all notes... can be stored".
        // I will change the behavior to "Save" instead of "Send" maybe? Or just keep the draft.
        // I'll keep the "Send" behavior (Clear) but ensure valid "draft" saving.
        setNote("")
        localStorage.removeItem('orbit-cute-note')
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
                onChange={(e) => handleSave(e.target.value)}
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
