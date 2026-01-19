"use client"

import * as React from "react"
import { useWidgetStore, WidgetType } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Settings2, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

// Widgets
import { DailyCheckIn } from "@/components/widgets/daily-check-in"
import { CuteNote } from "@/components/widgets/cute-note"
import { CallAvailability } from "@/components/widgets/call-availability"
import { GentlePing } from "@/components/widgets/gentle-ping"
import { TimerWidget } from "@/components/widgets/timer-widget"
import { DailyPhotoDrop } from "@/components/widgets/daily-photo-drop"
import { ToolsWidget } from "@/components/widgets/tools-widget"

import { MeetingCountdown } from "@/components/widgets/meeting-countdown"

const widgetMap: Record<WidgetType, React.ReactNode> = {
    meeting: <MeetingCountdown />,
    checkin: <DailyCheckIn />,
    note: <CuteNote />,
    availability: <CallAvailability />,
    ping: <GentlePing />,
    timer: <TimerWidget />,
    photo: <DailyPhotoDrop />,
    tools: <ToolsWidget />,
}

import { motion, LayoutGroup, AnimatePresence } from "framer-motion"

export function DashboardGrid() {
    const { widgets, isEditMode, toggleEditMode, toggleWidget } = useWidgetStore()
    const visibleWidgets = widgets.filter(w => w.visible)

    // Apple-style spring physics
    const springTransition = { type: "spring", stiffness: 400, damping: 30 } as any

    return (
        <div className="space-y-4 max-w-5xl mx-auto">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold text-primary/80 uppercase tracking-widest">
                    {isEditMode ? "Design Your Space" : "Your Orbit"}
                </h2>
                <Button
                    variant={isEditMode ? "default" : "ghost"}
                    size="sm"
                    onClick={toggleEditMode}
                    className="h-8 text-xs gap-2 rounded-full transition-all active:scale-95 hover:bg-white/50"
                >
                    {isEditMode ? <Check className="w-3.5 h-3.5" /> : <Settings2 className="w-3.5 h-3.5" />}
                    {isEditMode ? "Done" : "Customize"}
                </Button>
            </div>

            <LayoutGroup>
                <AnimatePresence mode="popLayout">
                    {isEditMode ? (
                        <motion.div
                            layout
                            className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 border-2 border-dashed border-primary/20 rounded-3xl bg-white/30 backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={springTransition}
                        >
                            {widgets.map((widget) => (
                                <motion.div
                                    layout
                                    key={widget.id}
                                    onClick={() => toggleWidget(widget.id)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={springTransition}
                                    className={cn(
                                        "aspect-square p-4 rounded-3xl cursor-pointer transition-all flex flex-col items-center justify-center gap-2 text-center relative overflow-hidden",
                                        widget.visible
                                            ? "bg-white shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-background"
                                            : "bg-white/40 hover:bg-white/60 text-muted-foreground border border-transparent"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                        widget.visible ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                    )}>
                                        {widget.visible ? <Check className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current opacity-50" />}
                                    </div>
                                    <span className="text-xs font-bold tracking-tight">{widget.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4" // Responsive Grid: 2 cols mobile, 4 desktop
                        >
                            {visibleWidgets.map((widget) => (
                                <motion.div
                                    layout
                                    key={widget.id}
                                    className="aspect-square w-full h-full"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    whileHover={{ scale: 1.03, y: -2 }} // "Float" effect
                                    whileTap={{ scale: 0.97 }} // "Squish" effect
                                    transition={springTransition}
                                >
                                    {widgetMap[widget.id]}
                                </motion.div>
                            ))}
                            {visibleWidgets.length === 0 && (
                                <div className="col-span-2 md:col-span-4 py-16 text-center text-muted-foreground text-sm border-2 border-dashed border-primary/10 rounded-3xl bg-white/20">
                                    Your orbit is empty.<br />Tap "Customize" to add widgets.
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </div>
    )
}
