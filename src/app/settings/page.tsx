"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Moon, Sun } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
    const { setTheme, theme } = useTheme()
    const [userName, setUserName] = React.useState("")

    React.useEffect(() => {
        const stored = localStorage.getItem("orbit_user_name")
        if (stored) setUserName(stored)
    }, [])

    const handleSaveName = () => {
        localStorage.setItem("orbit_user_name", userName)
        alert("Saved!")
    }

    return (
        <div className="container mx-auto max-w-md p-4 space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-primary">Settings</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the vibe of your space.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4 text-orange-500" />
                            <Label htmlFor="theme-mode">Theme Mode</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{theme === 'dark' ? 'Cozy Dark' : 'Soft Light'}</span>
                            <Switch
                                id="theme-mode"
                                checked={theme === 'dark'}
                                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                            />
                        </div>
                    </div>
                    {/* Future: Color palette picker (Pink vs Blue vs Neutral) */}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>How your partner sees you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input
                            id="name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleSaveName} className="w-full">Save Profile</Button>
                </CardContent>
            </Card>

            <div className="text-center text-xs text-muted-foreground pt-10">
                Orbit v0.1 • Made with softness
            </div>
        </div>
    )
}
