"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { ImagePlus, X } from "lucide-react"

export function DailyPhotoDrop() {
    const [image, setImage] = React.useState<string | null>(null)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const clearImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        setImage(null)
    }

    return (
        <Card
            onClick={() => fileInputRef.current?.click()}
            className="group h-full relative overflow-hidden bg-muted/20 border-muted hover:border-sidebar-primary/20 transition-all cursor-pointer shadow-sm"
        >
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {image ? (
                <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={image}
                        alt="Daily drop"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <button
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-2 group-hover:text-primary transition-colors">
                    <div className="p-3 rounded-full bg-background border border-border group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                        <ImagePlus className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-medium tracking-wide">ADD PHOTO</span>
                </div>
            )}
        </Card>
    )
}
