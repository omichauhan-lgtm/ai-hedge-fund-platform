"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUISounds } from "@/hooks/use-sounds";
import { Cpu } from "lucide-react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const { playBoot } = useUISounds();

    useEffect(() => {
        playBoot();

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500); // Small delay after 100%
                    return 100;
                }
                return prev + Math.random() * 5; // Random boot speed
            });
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete, playBoot]);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 relative"
            >
                {/* Logo Pulse */}
                <motion.div
                    animate={{ boxShadow: ["0 0 0px #cbfe00", "0 0 50px #cbfe00", "0 0 0px #cbfe00"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-24 w-24 rounded-2xl bg-primary flex items-center justify-center text-black"
                >
                    <Cpu className="h-12 w-12" />
                </motion.div>
            </motion.div>

            <div className="w-64 space-y-2">
                <div className="flex justify-between text-xs font-mono text-muted-foreground uppercase">
                    <span>System Boot</span>
                    <span>{Math.min(100, Math.floor(progress))}%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-[10px] text-center text-white/20 font-mono pt-4">
                    INITIALIZING QUANTUM CORE...
                </p>
            </div>
        </div>
    );
}
