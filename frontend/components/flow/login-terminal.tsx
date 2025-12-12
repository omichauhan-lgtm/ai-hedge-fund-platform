"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Lock, ChevronRight } from "lucide-react";
import { useUISounds } from "@/hooks/use-sounds";
import { useAppStore } from "@/lib/store";

export function LoginTerminal() {
    const { setFlowState } = useAppStore();
    const { playClick, playSuccess, playHover } = useUISounds();
    const [key, setKey] = useState("");
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const handleLogin = () => {
        if (!key) return;
        playClick();
        setIsAuthenticating(true);
        setTimeout(() => {
            playSuccess();
            setFlowState('BOOT');
        }, 1500); // Simulate auth delay
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl"
            >
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Terminal className="h-3 w-3" />
                        <span className="font-mono">SECURE ACCESS GATEWAY v4.5</span>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-red-500/20" />
                        <div className="h-2 w-2 rounded-full bg-yellow-500/20" />
                        <div className="h-2 w-2 rounded-full bg-green-500/20" />
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                            <Lock className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-white">Identity Verification</h2>
                        <p className="text-xs text-muted-foreground font-mono">
                            ENTER ACCESS KEY TO INITIALIZE QUANTUM CORE
                        </p>
                    </div>

                    <div className="relative group">
                        <input
                            type="password"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            placeholder="ACCESS KEY..."
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-center font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all tracking-[0.5em]"
                            autoFocus
                        />
                        <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500" />
                    </div>

                    <button
                        onClick={handleLogin}
                        onMouseEnter={() => playHover()}
                        disabled={isAuthenticating || !key}
                        className="w-full group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 hover:text-primary disabled:opacity-50"
                    >
                        {isAuthenticating ? (
                            <span className="font-mono animate-pulse">AUTHENTICATING...</span>
                        ) : (
                            <>
                                <span>INITIALIZE SYSTEM</span>
                                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                        {/* Scan line effect */}
                        {isAuthenticating && (
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent skew-x-12"
                            />
                        )}

                    </button>

                    <div className="flex justify-between text-[10px] font-mono text-muted-foreground/50">
                        <span>SECURE CONNECTION: TLS 1.3</span>
                        <span>IP: 192.168.X.X (MASKED)</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
