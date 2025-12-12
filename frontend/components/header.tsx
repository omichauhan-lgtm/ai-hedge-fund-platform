"use client";

import { motion } from "framer-motion";
import { Terminal, Activity, Globe, Wifi, Settings, Bell, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useUISounds } from "@/hooks/use-sounds";

export function Header() {
    const [time, setTime] = useState("");
    const { region, contextMode, setContextMode, flowState } = useAppStore();
    const { playClick } = useUISounds();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleMode = () => {
        playClick();
        setContextMode(contextMode === 'GLOBAL' ? 'DOMESTIC' : 'GLOBAL');
    };

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-50 flex h-16 items-center border-b border-white/10 bg-black/50 px-6 backdrop-blur-xl"
        >
            {/* Left: Brand */}
            <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Terminal className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight text-white leading-none">QUANTUM EDGE</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground">v4.5-HYPERION AI</span>
                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                    </div>
                </div>
            </div>

            {/* Center: Context Toggle */}
            <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-3 bg-white/5 rounded-full p-1 border border-white/10">
                    <button
                        onClick={() => contextMode !== 'GLOBAL' && toggleMode()}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-medium transition-all",
                            contextMode === 'GLOBAL' ? "bg-primary text-black shadow-lg" : "text-white/50 hover:text-white"
                        )}
                    >
                        GLOBAL
                    </button>
                    <button
                        onClick={() => contextMode !== 'DOMESTIC' && toggleMode()}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-2",
                            contextMode === 'DOMESTIC' ? "bg-primary text-black shadow-lg" : "text-white/50 hover:text-white"
                        )}
                    >
                        <span>DOMESTIC</span>
                        <span className="text-[9px] uppercase opacity-70">({region})</span>
                    </button>
                </div>
            </div>

            {/* Right: Status */}
            <div className="flex items-center gap-6">
                {/* Sys Stats */}
                <div className="hidden md:flex gap-4 text-xs font-mono text-muted-foreground border-r border-white/10 pr-6">
                    <div className="flex items-center gap-2">
                        <Activity className="h-3 w-3 text-emerald-500" />
                        <span>SYS: 99.9%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Wifi className="h-3 w-3 text-emerald-500" />
                        <span>LAT: 12ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock className="h-3 w-3 text-emerald-500" />
                        <span>SEC: ENCRYPTED</span>
                    </div>
                </div>

                {/* Clock */}
                <div className="text-lg font-mono font-bold text-white tracking-widest leading-none">
                    {time}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <Bell className="h-4 w-4 text-white" />
                    </button>
                    <button className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <Settings className="h-4 w-4 text-white" />
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
