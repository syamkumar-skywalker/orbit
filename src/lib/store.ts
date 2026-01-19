import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type WidgetType = 'checkin' | 'note' | 'availability' | 'ping' | 'timer' | 'photo' | 'tools' | 'meeting'

interface WidgetConfig {
    id: WidgetType
    label: string
    visible: boolean
}

interface WidgetStore {
    isEditMode: boolean
    toggleEditMode: () => void
    widgets: WidgetConfig[]
    toggleWidget: (id: WidgetType) => void
    resetLayout: () => void
}

const defaultWidgets: WidgetConfig[] = [
    { id: 'meeting', label: 'Days Until Meet', visible: true },
    { id: 'checkin', label: 'Daily Check-in', visible: true },
    { id: 'note', label: 'Cute Note', visible: true },
    { id: 'availability', label: 'Call Status', visible: true },
    { id: 'ping', label: 'Gentle Ping', visible: true },
    { id: 'photo', label: 'Photo Drop', visible: false },
]

export const useWidgetStore = create<WidgetStore>()(
    persist(
        (set) => ({
            isEditMode: false,
            toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
            widgets: defaultWidgets,
            toggleWidget: (id) =>
                set((state) => ({
                    widgets: state.widgets.map((w) =>
                        w.id === id ? { ...w, visible: !w.visible } : w
                    ),
                })),
            resetLayout: () => set({ widgets: defaultWidgets }),
        }),
        {
            name: 'orbit-widget-storage-v7',
        }
    )
)
