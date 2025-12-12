"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/loading-screen";

export function SystemProvider({ children }: { children: React.ReactNode }) {
    // Start with loading true
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Prevent hydration mismatch

    return (
        <>
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            <div className={isLoading ? "opacity-0" : "animate-in fade-in duration-1000"}>
                {children}
            </div>
        </>
    );
}
