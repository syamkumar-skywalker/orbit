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
    const [magicLinkSent, setMagicLinkSent] = React.useState(false)

    React.useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        if (isLocalMode) {
            // Local Mode: Check localStorage
            const storedName = localStorage.getItem("orbit_user_name")
            if (storedName) {
                setIsAuthenticated(true)
            }
        } else {
            // Supabase Mode: Check Session
            const { data } = await supabase!.auth.getSession()
            if (data.session) {
                setIsAuthenticated(true)
            }

            // Listen for auth changes
            const { data: { subscription } } = supabase!.auth.onAuthStateChange((_event, session) => {
                if (session) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
            })

            return () => subscription.unsubscribe()
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
        try {
            const { error } = await supabase!.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: window.location.origin,
                }
            })
            if (error) {
                alert("Error logging in: " + error.message)
            } else {
                setMagicLinkSent(true)
            }
        } catch (e) {
            console.error(e)
            alert("Unexpected error during login")
        }
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground animate-pulse">Connecting to Orbit...</p>
                </div>
            </div>
        )
    }

    if (isAuthenticated) {
        return <>{children}</>
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md shadow-lg border-primary/10">
                <CardHeader className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-2">
                        <div className="w-6 h-6 bg-primary rounded-full animate-pulse" />
                    </div>
                    <CardTitle className="text-3xl font-serif text-primary">Orbit</CardTitle>
                    <CardDescription>A soft space for connection.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {isLocalMode ? (
                        <div className="space-y-4">
                            <div className="text-sm text-muted-foreground text-center bg-secondary/50 p-3 rounded-lg border border-secondary">
                                running in <span className="font-semibold text-foreground">local mode</span>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground ml-1">Your Name</label>
                                <Input
                                    placeholder="Enter your name..."
                                    value={localName}
                                    onChange={(e) => setLocalName(e.target.value)}
                                    className="bg-muted/50"
                                />
                            </div>
                            <Button className="w-full font-medium" onClick={handleLocalLogin}>
                                Enter Orbit
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {magicLinkSent ? (
                                <div className="text-center p-6 bg-green-500/10 rounded-xl border border-green-500/20 text-green-800 dark:text-green-200">
                                    <h3 className="font-semibold mb-1">Check your email</h3>
                                    <p className="text-sm opacity-90">We sent you a magic link to sign in.</p>
                                    <Button
                                        variant="link"
                                        className="text-xs mt-2 text-green-700 dark:text-green-300"
                                        onClick={() => setMagicLinkSent(false)}
                                    >
                                        Try different email
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div className="text-sm text-muted-foreground text-center">
                                        Sign in to sync with your partner
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase text-muted-foreground ml-1">Email</label>
                                        <Input
                                            placeholder="hello@example.com"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <Button className="w-full" onClick={handleSupabaseLogin}>
                                        Send Magic Link
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
