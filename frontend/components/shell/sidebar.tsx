"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, BrainCircuit, LineChart, PieChart, Zap, ShieldCheck } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useUISounds } from "@/hooks/use-sounds";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { id: "OVERVIEW", label: "Command Center", icon: LayoutDashboard },
    { id: "STRATEGY", label: "Strategy Lab", icon: BrainCircuit },
    { id: "BACKTEST", label: "Backtest Studio", icon: LineChart },
    { id: "PORTFOLIO", label: "Portfolio Architect", icon: PieChart },
    { id: "EXECUTION", label: "Execution Queue", icon: Zap },
    { id: "COMPLIANCE", label: "Compliance Gate", icon: ShieldCheck },
] as const;

export function Sidebar() {
    const { activeView, setActiveView } = useAppStore();
    const { playClick, playHover } = useUISounds();

    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 border-r border-white/10 bg-black/20 backdrop-blur-xl flex flex-col py-6"
        >
            <div className="px-4 mb-4">
                <p className="text-xs font-mono text-muted-foreground uppercase pl-3 mb-2">Modules</p>
                <div className="space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    playClick();
                                    setActiveView(item.id as any);
                                }}
                                onMouseEnter={() => playHover()}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all group relative",
                                    isActive
                                        ? "bg-primary/10 text-primary shadow-[0_0_15px_-3px_rgba(203,254,0,0.2)]"
                                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                                <span>{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-auto px-6">
                <div className="rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 p-4">
                    <h4 className="text-xs font-bold text-white mb-1">Compute Usage</h4>
                    <div className="h-1.5 w-full bg-black rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-emerald-500 w-[75%]" />
                    </div>
                    <div className="flex justify-between text-[9px] text-muted-foreground font-mono">
                        <span>75% LOAD</span>
                        <span>4/8 GPU</span>
                    </div>
                </div>
            </div>
        </motion.aside>
    );
}
