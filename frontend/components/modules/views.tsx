"use client";
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Activity, Zap, Shield, FileText } from "lucide-react";

export const StrategyBuilderView = () => {
    const [prompt, setPrompt] = React.useState("");
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [jsonOutput, setJsonOutput] = React.useState<string | null>(null);

    const handleGenerate = () => {
        if (!prompt) {
            setPrompt("Create a mean reversion strategy for Nifty 50 during high volatility.");
        }
        setIsGenerating(true);
        setTimeout(() => {
            setJsonOutput(JSON.stringify({
                strategy: "MEAN_REVERSION_VOL_ADJUSTED",
                asset_universe: ["NIFTY50"],
                parameters: {
                    lookback_period: 20,
                    z_score_threshold: 2.5,
                    stop_loss_atr: 1.5
                },
                risk_limits: {
                    max_drawdown: 0.15,
                    position_sizing: "VOLATILITY_WEIGHTED"
                }
            }, null, 2));
            setIsGenerating(false);
        }, 1200); // 1.2s delay for effect
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Strategy Architect</h2>
                <Button variant="primary" onClick={handleGenerate} disabled={isGenerating}>
                    {isGenerating ? <Activity className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    {isGenerating ? "Architecting..." : "Generate Template"}
                </Button>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <Card className="col-span-8 p-6 space-y-4 min-h-[400px]">
                    <h3 className="text-sm font-mono text-muted-foreground uppercase">Natural Language Input</h3>
                    <textarea
                        className="w-full h-48 bg-black/40 border border-white/10 rounded-lg p-4 text-white font-mono focus:outline-none focus:border-primary/50 transition-all"
                        placeholder="Describe your strategy logic... (e.g., 'Execute Mean Reversion on NASDAQ top 50 symbols when RSI < 30 and VIX < 20. Exit when price crosses SMA 50.')"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="flex gap-2">
                        {["Mean Reversion", "Momentum Breakout", "Statistical Arbitrage"].map(tag => (
                            <button key={tag} onClick={() => setPrompt(`Create a ${tag} strategy for...`)} className="px-3 py-1 bg-white/5 rounded-full text-xs hover:bg-white/10 transition-colors">{tag}</button>
                        ))}
                    </div>
                </Card>
                <Card className="col-span-4 p-6 bg-white/5 border-dashed relative overflow-hidden">
                    {jsonOutput ? (
                        <pre className="text-xs text-green-400 font-mono overflow-auto h-full animate-in fade-in zoom-in-95 duration-300">
                            {jsonOutput}
                        </pre>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                            <FileText className="h-12 w-12" />
                            <p className="text-sm">JSON Logic will appear here</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export const BacktestView = () => (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Backtest Lab</h2>
            <div className="flex gap-2">
                <Button variant="ghost">Export Report</Button>
                <Button variant="primary">Run Full Simulation</Button>
            </div>
        </div>
        <Card className="p-6">
            <h3 className="text-sm font-mono text-muted-foreground uppercase mb-4">Performance Heatmap (Year-over-Year)</h3>
            <div className="grid grid-cols-12 gap-1 h-64">
                {Array.from({ length: 48 }).map((_, i) => {
                    const intensity = Math.random();
                    // Green if > 0.4, Red if < 0.4.
                    const isGreen = intensity > 0.3;
                    const opacity = 0.2 + (intensity * 0.8);
                    return (
                        <div
                            key={i}
                            className={`rounded-sm ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ opacity }}
                        />
                    )
                })}
            </div>
            <div className="mt-6 grid grid-cols-4 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-xs text-muted-foreground">Total Return</div>
                    <div className="text-2xl font-bold text-green-400">+124.5%</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-xs text-muted-foreground">Sharpe Ratio</div>
                    <div className="text-2xl font-bold text-white">2.85</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-xs text-muted-foreground">Max Drawdown</div>
                    <div className="text-2xl font-bold text-red-400">-12.1%</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                    <div className="text-2xl font-bold text-blue-400">68%</div>
                </div>
            </div>
        </Card>
    </div>
);

export const PortfolioView = () => {
    const [regime, setRegime] = React.useState<"NEUTRAL" | "BULL_TREND" | "LIQUIDITY_CRISIS">("NEUTRAL");
    const [loading, setLoading] = React.useState(false);

    const handleAdapt = () => {
        setLoading(true);
        setTimeout(() => {
            setRegime("BULL_TREND");
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Portfolio Architect</h2>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${regime === 'BULL_TREND' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-white/5 border-white/10 text-muted-foreground'}`}>
                        <Activity className="w-4 h-4" />
                        <span className="text-xs font-bold tracking-wider">{regime.replace('_', ' ')}</span>
                    </div>
                    <Button variant="primary" onClick={handleAdapt} disabled={loading || regime === 'BULL_TREND'}>
                        {loading ? <Zap className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                        {loading ? "Rebalancing..." : "Run Regime Adaptation"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="mb-4 text-sm text-muted-foreground">Asset Allocation</h3>
                    <div className="space-y-4">
                        {/* Mock Bars */}
                        {[
                            { label: "Equities (Growth)", val: regime === 'BULL_TREND' ? 65 : 40, color: "bg-blue-500" },
                            { label: "Bonds (Govt)", val: regime === 'BULL_TREND' ? 10 : 30, color: "bg-yellow-500" },
                            { label: "Commodities", val: regime === 'BULL_TREND' ? 15 : 10, color: "bg-orange-500" },
                            { label: "Cash / Hedges", val: regime === 'BULL_TREND' ? 10 : 20, color: "bg-gray-500" },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span>{item.label}</span>
                                    <span>{item.val}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${item.color} transition-all duration-1000 ease-in-out`}
                                        style={{ width: `${item.val}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="p-6 flex flex-col items-center justify-center text-center space-y-4 border-dashed">
                    <Shield className={`w-16 h-16 ${regime === 'BULL_TREND' ? 'text-green-500' : 'text-gray-600'} transition-colors duration-500`} />
                    <div>
                        <h4 className="font-bold text-lg">Dynamic Risk Controls</h4>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
                            {regime === 'BULL_TREND'
                                ? "Aggressive posture enabled. Volatility targeting increased to 18%. Leverage cap raised to 2.5x."
                                : "Standard risk parameters active. Monitoring market microstructure for liquidity gaps."}
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export const ComplianceView = () => (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
        <h2 className="text-2xl font-bold text-white">Compliance Gate</h2>
        <Card className="p-0 overflow-hidden">
            <table className="w-full">
                <thead className="bg-white/5 text-xs uppercase text-muted-foreground font-mono">
                    <tr>
                        <th className="px-6 py-4 text-left">Ticket ID for Strategy</th>
                        <th className="px-6 py-4 text-left">Risk Score</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {[1, 2, 3].map((_, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                                <span className="font-bold text-white">ALPHA-V4-{i}92</span>
                                <div className="text-xs text-muted-foreground">Leverage limit increase request</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-yellow-500 font-mono">MED (4.5)</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded text-xs">PENDING REVIEW</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Button variant="ghost">Approve</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    </div>
);
