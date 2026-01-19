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

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest pl-1">
                    {isEditMode ? "Design Your Space" : "Your Orbit"}
                </h2>
                <Button
                    variant={isEditMode ? "default" : "ghost"}
                    size="sm"
                    onClick={toggleEditMode}
                    className="h-8 text-xs gap-2 rounded-full transition-all active:scale-95"
                >
                    {isEditMode ? <Check className="w-3 h-3" /> : <Settings2 className="w-3 h-3" />}
                    {isEditMode ? "Done" : "Customize"}
                </Button>
            </div>

            <LayoutGroup>
                <AnimatePresence mode="popLayout">
                    {isEditMode ? (
                        <motion.div
                            layout
                            className="grid grid-cols-2 gap-3 p-4 border rounded-3xl bg-muted/30 border-dashed"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            {widgets.map((widget) => (
                                <motion.div
                                    layout
                                    key={widget.id}
                                    onClick={() => toggleWidget(widget.id)}
                                    whileTap={{ scale: 0.95 }}
                                    className={cn(
                                        "p-4 rounded-2xl border cursor-pointer transition-colors flex items-center justify-between shadow-xs",
                                        widget.visible
                                            ? "bg-white border-primary/20 text-primary shadow-sm"
                                            : "bg-background/50 border-transparent text-muted-foreground hover:bg-white/50"
                                    )}
                                >
                                    <span className="text-sm font-medium">{widget.label}</span>
                                    <div className={cn(
                                        "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                                        widget.visible ? "bg-primary border-primary" : "border-muted-foreground/30"
                                    )}>
                                        {widget.visible && <Check className="w-3 h-3 text-primary-foreground" />}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div layout className="grid grid-cols-2 gap-3">
                            {visibleWidgets.map((widget) => (
                                <motion.div
                                    layout
                                    key={widget.id}
                                    className="aspect-square h-40"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    {widgetMap[widget.id]}
                                </motion.div>
                            ))}
                            {visibleWidgets.length === 0 && (
                                <div className="col-span-2 py-12 text-center text-muted-foreground text-sm border-2 border-dashed border-primary/10 rounded-3xl">
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
