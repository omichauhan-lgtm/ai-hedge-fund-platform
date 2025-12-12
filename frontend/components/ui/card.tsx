"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export function Card({ children, className, title }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "relative overflow-hidden rounded-xl border border-white/10 bg-card p-6 shadow-2xl",
                "backdrop-blur-xl bg-opacity-80", // Glass effect
                className
            )}
        >
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {title && (
                <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-2">
                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">{title}</h3>
                    <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#cbfe00]" /> {/* Status Dot */}
                </div>
            )}

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
