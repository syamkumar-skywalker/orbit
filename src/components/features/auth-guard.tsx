"use client"

import * as React from "react"
import { supabase, isLocalMode } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)
    const [email, setEmail] = React.useState("")
    const [localName, setLocalName] = React.useState("")

    React.useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        if (isLocalMode) {
            const storedName = localStorage.getItem("orbit_user_name")
            if (storedName) {
                setIsAuthenticated(true)
            }
        } else {
            const { data } = await supabase!.auth.getSession()
            if (data.session) {
                setIsAuthenticated(true)
            }
        }
        setIsLoading(false)
    }

    const handleLocalLogin = () => {
        if (localName.trim()) {
            localStorage.setItem("orbit_user_name", localName.trim())
            setIsAuthenticated(true)
        }
    }

    const handleSupabaseLogin = async () => {
        if (!email) return
        const { error } = await supabase!.auth.signInWithOtp({ email })
        if (error) {
            alert("Error logging in: " + error.message)
        } else {
            alert("Magic link sent! Check your email.")
        }
    }

    if (isLoading) {
        return <div className="flex min-h-screen items-center justify-center bg-background">Loading...</div>
    }

    if (isAuthenticated) {
        return <>{children}</>
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-primary">Orbit</CardTitle>
                    <CardDescription>A soft space for connection.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLocalMode ? (
                        <div className="space-y-4">
                            <div className="text-sm text-muted-foreground text-center">
                                Running in Local Mode. Enter your name to continue.
                            </div>
                            <Input
                                placeholder="Your Name"
                                value={localName}
                                onChange={(e) => setLocalName(e.target.value)}
                            />
                            <Button className="w-full" onClick={handleLocalLogin}>
                                Enter Orbit
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="text-sm text-muted-foreground text-center">
                                Sign in with your email to sync across devices.
                            </div>
                            <Input
                                placeholder="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button className="w-full" onClick={handleSupabaseLogin}>
                                Send Magic Link
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
