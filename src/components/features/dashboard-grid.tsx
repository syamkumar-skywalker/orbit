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

const widgetMap: Record<WidgetType, React.ReactNode> = {
    checkin: <DailyCheckIn />,
    note: <CuteNote />,
    availability: <CallAvailability />,
    ping: <GentlePing />,
    timer: <TimerWidget />,
    photo: <DailyPhotoDrop />,
    tools: <ToolsWidget />,
}

export function DashboardGrid() {
    const { widgets, isEditMode, toggleEditMode, toggleWidget } = useWidgetStore()
    const visibleWidgets = widgets.filter(w => w.visible)

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest pl-1">
                    {isEditMode ? "Start Customizing" : "Your Space"}
                </h2>
                <Button
                    variant={isEditMode ? "default" : "ghost"}
                    size="sm"
                    onClick={toggleEditMode}
                    className="h-8 text-xs gap-2"
                >
                    {isEditMode ? <Check className="w-3 h-3" /> : <Settings2 className="w-3 h-3" />}
                    {isEditMode ? "Done" : "Customize"}
                </Button>
            </div>

            {isEditMode ? (
                <div className="grid grid-cols-2 gap-3 p-4 border rounded-xl bg-muted/30 border-dashed">
                    {widgets.map((widget) => (
                        <div
                            key={widget.id}
                            onClick={() => toggleWidget(widget.id)}
                            className={cn(
                                "p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between",
                                widget.visible
                                    ? "bg-primary/10 border-primary text-primary"
                                    : "bg-background border-border text-muted-foreground hover:border-primary/50"
                            )}
                        >
                            <span className="text-sm font-medium">{widget.label}</span>
                            <div className={cn(
                                "w-4 h-4 rounded-full border flex items-center justify-center",
                                widget.visible ? "bg-primary border-primary" : "border-muted-foreground"
                            )}>
                                {widget.visible && <Check className="w-3 h-3 text-primary-foreground" />}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    {visibleWidgets.map((widget) => (
                        <div key={widget.id} className="aspect-square h-40">
                            {widgetMap[widget.id]}
                        </div>
                    ))}
                    {visibleWidgets.length === 0 && (
                        <div className="col-span-2 py-8 text-center text-muted-foreground text-sm border-2 border-dashed rounded-xl">
                            No widgets visible. Click "Customize" to add some.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
