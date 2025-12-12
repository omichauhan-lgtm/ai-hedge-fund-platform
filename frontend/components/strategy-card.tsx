import { Card } from "@/components/ui/card";
import { BadgeCheck, TrendingUp, AlertTriangle, Activity } from "lucide-react";

interface StrategyProps {
    strategy: {
        id: string;
        name: string;
        type: string;
        sharpe: number;
        return: number;
        drawdown: number;
        status: "ACTIVE" | "PAUSED";
    }
}

export function StrategyCard({ strategy }: StrategyProps) {
    return (
        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{strategy.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400 font-mono">
                            {strategy.type}
                        </span>
                        {strategy.sharpe > 2.0 && (
                            <span className="flex items-center gap-1 text-xs text-primary">
                                <BadgeCheck className="w-3 h-3" /> High Quality
                            </span>
                        )}
                    </div>
                </div>
                <div className={`h-2 w-2 rounded-full ${strategy.status === "ACTIVE" ? "bg-green-500 shadow-[0_0_8px_green]" : "bg-yellow-500"}`} />
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/5 border-b mb-4">
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Sharpe</p>
                    <p className="font-mono text-xl font-bold text-white">{strategy.sharpe.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Ret (Y)</p>
                    <p className="font-mono text-xl font-bold text-primary">+{strategy.return}%</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">DD</p>
                    <p className="font-mono text-xl font-bold text-red-500">-{strategy.drawdown}%</p>
                </div>
            </div>

            {/* Mock Sparkline */}
            <div className="h-16 w-full flex items-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                {[...Array(20)].map((_, i) => (
                    <div key={i}
                        style={{ height: `${Math.random() * 100}%` }}
                        className="flex-1 bg-gradient-to-t from-primary/10 to-primary rounded-t-sm"
                    />
                ))}
            </div>
        </Card>
    );
}
