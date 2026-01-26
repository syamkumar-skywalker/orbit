"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { useOrbitData } from "@/hooks/use-orbit-data"

export function CuteNote() {
    const [note, setNote] = React.useState("")
    const { latestNote, actions, loading } = useOrbitData()
    const { sendNote } = actions

    // For local draft persistence
    React.useEffect(() => {
        const saved = localStorage.getItem('orbit-cute-note-draft')
        if (saved) setNote(saved)
    }, [])

    const handleSaveDraft = (value: string) => {
        setNote(value)
        localStorage.setItem('orbit-cute-note-draft', value)
    }

    const handleSend = async () => {
        if (!note.trim()) return

        await sendNote(note)
        setNote("")
        localStorage.removeItem('orbit-cute-note-draft')
    }

    return (
        <Card className="h-full flex flex-col p-4 border-muted hover:border-sidebar-primary/20 transition-colors shadow-sm bg-card/50 gap-2 relative overflow-hidden">
            <div className="flex items-center justify-between z-10">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Note</h3>
                {latestNote && !latestNote.is_read && (
                    <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                )}
            </div>

            {latestNote && (
                <div className="absolute top-12 right-2 rotate-2 bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded shadow-sm max-w-[120px] text-[10px] z-20 border border-yellow-200/50">
                    <p className="line-clamp-3 italic text-muted-foreground">"{latestNote.content}"</p>
                </div>
            )}

            <Textarea
                placeholder={loading ? "Loading..." : "Share a thought..."}
                className="flex-1 min-h-0 resize-none text-sm bg-muted/20 border-transparent focus:bg-background focus:ring-0 p-2 leading-relaxed selection:bg-primary/20 z-10"
                value={note}
                onChange={(e) => handleSaveDraft(e.target.value)}
                maxLength={140}
                disabled={loading}
            />
            <div className="flex justify-end z-10">
                <Button
                    size="icon"
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                    onClick={handleSend}
                    disabled={!note.trim() || loading}
                >
                    <Send className="w-3 h-3" />
                </Button>
            </div>
        </Card>
    )
}
