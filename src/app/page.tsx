"use client"

import * as React from "react"
import { DashboardGrid } from "@/components/features/dashboard-grid"
import { MemoryBoardPreview } from "@/components/features/memory-board-preview"
import { SchedulePreview } from "@/components/features/schedule-preview"

export default function Dashboard() {
  return (
    <div className="container mx-auto max-w-md p-4 space-y-6 pb-20">
      {/* Top Section: Widget Grid */}
      <section className="space-y-4">
        <h2 className="sr-only">Quick Actions</h2>
        <DashboardGrid />
      </section>

      {/* Middle Section: Memory Board */}
      <section>
        <MemoryBoardPreview />
      </section>

      {/* Bottom Section: Schedule */}
      <section>
        <SchedulePreview />
      </section>

      {/* Footer / Nav safe area padding handled by pb-20 */}
    </div>
  )
}
