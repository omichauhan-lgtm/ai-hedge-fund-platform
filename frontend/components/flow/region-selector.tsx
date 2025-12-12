"use client";

import { motion } from "framer-motion";
import { Globe, MapPin, Building2, TrendingUp } from "lucide-react";
import { useUISounds } from "@/hooks/use-sounds";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const REGIONS = [
    {
        id: "USA",
        name: "North America (USA)",
        code: "US-NY",
        market: "NYSE / NASDAQ",
        color: "from-blue-500/20 to-purple-500/20",
        border: "group-hover:border-blue-500/50"
    },
    {
        id: "INDIA",
        name: "Asia Pacific (INDIA)",
        code: "IN-MUM",
        market: "NSE / BSE",
        color: "from-orange-500/20 to-green-500/20",
        border: "group-hover:border-orange-500/50"
    },
    {
        id: "UK",
        name: "Europe (UK)",
        code: "UK-LON",
        market: "LSE",
        color: "from-red-500/20 to-blue-500/20",
        border: "group-hover:border-red-500/50"
    }
] as const;

export function RegionSelector() {
    const { setRegion, setFlowState } = useAppStore();
    const { playClick, playHover } = useUISounds();

    const handleSelect = (regionId: any) => {
        playClick();
        setRegion(regionId);
        setTimeout(() => setFlowState('DASHBOARD'), 500);
    };

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4 mb-12"
            >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Select Primary Market</h1>
                <p className="text-muted-foreground font-mono max-w-md mx-auto">
                    DEFINE DOMESTIC LIQUIDITY SOURCE FOR ALGO EXECUTION
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {REGIONS.map((region, idx) => (
                    <motion.button
                        key={region.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onMouseEnter={() => playHover()}
                        onClick={() => handleSelect(region.id)}
                        className="group relative h-64 overflow-hidden rounded-xl border border-white/10 bg-black/50 backdrop-blur-md text-left transition-all hover:scale-[1.02]"
                    >
                        {/* Background Gradient */}
                        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", region.color)} />

                        {/* Active Border */}
                        <div className={cn("absolute inset-0 border-2 border-transparent transition-colors duration-300 rounded-xl pointer-events-none", region.border)} />

                        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono text-white/40">{region.code}</span>
                                    <MapPin className="h-4 w-4 text-white/20 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                    {region.name}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-white/60">
                                        <Building2 className="h-4 w-4" />
                                        <span>Exchanges: {region.market}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-white/60">
                                        <TrendingUp className="h-4 w-4" />
                                        <span>Latency: &lt;12ms</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-[10px] font-mono text-primary/0 group-hover:text-primary transition-all translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                    <span>CONNECTION AVAILABLE</span>
                                </div>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
