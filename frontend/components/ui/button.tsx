"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { useUISounds } from "@/hooks/use-sounds";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
}

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
    const { playClick, playHover } = useUISounds();

    const variants = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(203,254,0,0.3)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        ghost: "bg-transparent text-foreground hover:bg-white/5 border border-white/10",
        danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => playHover()}
            onClick={(e) => {
                playClick();
                props.onClick?.(e);
            }}
            className={cn(
                "inline-flex h-10 items-center justify-center rounded-lg px-6 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
