"use client";

import { useAppStore } from "@/lib/store";
import { LoginTerminal } from "@/components/flow/login-terminal";
import { LoadingScreen } from "@/components/loading-screen";
import { RegionSelector } from "@/components/flow/region-selector";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/shell/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StrategyCard } from "@/components/strategy-card";

import { Activity, BarChart3, ShieldCheck, Zap, Wallet, Lock, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StrategyBuilderView, ComplianceView, BacktestView, PortfolioView } from "@/components/modules/views";

// --- Mock Data ---
const STRATEGIES = [
  { id: "1", name: "Alpha One Momentum", type: "MOMENTUM", sharpe: 2.45, return: 32.4, drawdown: 5.2, status: "ACTIVE" },
  { id: "2", name: "Mean Rev Eura", type: "MEAN_REVERSION", sharpe: 1.89, return: 18.2, drawdown: 12.1, status: "ACTIVE" },
  { id: "3", name: "Crypto Arb HighFreq", type: "ARBITRAGE", sharpe: 3.10, return: 145.2, drawdown: 22.4, status: "PAUSED" },
  { id: "4", name: "Volatility Harvest", type: "ML_PREDICTIVE", sharpe: 1.2, return: 8.5, drawdown: 3.4, status: "ACTIVE" },
] as const;

const EXECUTIONS = [
  { symbol: "AAPL", side: "BUY", amt: "$15,400", time: "2m ago", status: "PENDING" },
  { symbol: "BTC-USD", side: "SELL", amt: "$42,100", time: "5m ago", status: "PENDING" },
  { symbol: "TSLA", side: "BUY", amt: "$8,200", time: "12m ago", status: "FILLED" },
];

function DashboardView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-5 duration-500">
      {/* Top Stats Row */}
      <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Wallet className="text-primary" />} label="Total AUM (Paper)" value="$4,250,900" sub="+2.4% today" />
        <StatCard icon={<ShieldCheck className="text-purple-500" />} label="Regime" value="BULL TREND" sub="Confidence: 92%" />
        <StatCard icon={<Activity className="text-blue-500" />} label="Portfolio Vol" value="12.4%" sub="Target: <15%" />
        <StatCard icon={<Zap className="text-yellow-500" />} label="Active Agents" value="5" sub="Running Optimal" />
      </div>

      {/* Left: Strategy Feed (8 cols) */}
      <div className="lg:col-span-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <BarChart3 className="text-primary" /> Active Strategies
          </h2>
          <Button variant="ghost" className="text-xs font-mono">VIEW ALL</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STRATEGIES.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <StrategyCard strategy={s} />
            </motion.div>
          ))}
        </div>

        {/* AI Insight Section */}
        <Card className="border-primary/20 bg-primary/5">
          <h3 className="text-primary font-bold mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" /> AI Architect Insight
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Detected a structural break in S&P500 volatility surface. Strategies leaning heavily on Mean Reversion have been down-weighted.
            Momentum allocation increased by <span className="text-white font-bold">15%</span> for the coming session.
          </p>
        </Card>
      </div>

      {/* Right: Execution Queue (4 cols) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Terminal className="text-secondary" /> Execution Queue
          </h2>
          <span className="h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">2</span>
        </div>

        <Card className="h-full min-h-[400px] border-secondary/20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {EXECUTIONS.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="group p-4 rounded-lg bg-black/40 border border-white/5 hover:border-secondary/50 transition-all cursor-pointer"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-white">{ex.symbol}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${ex.side === 'BUY' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {ex.side}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-xs text-muted-foreground">
                    Amount: <span className="text-white font-mono">{ex.amt}</span><br />
                    <span className="text-[10px] opacity-50">{ex.time}</span>
                  </div>
                  {ex.status === 'PENDING' ? (
                    <Button variant="primary" className="h-8 text-xs">Approve</Button>
                  ) : (
                    <span className="text-[10px] text-green-500 font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> VERIFIED
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-muted-foreground mb-4">Non-Custodial Mode Active</p>
            <Button variant="ghost" className="w-full text-xs border-dashed border-white/20">
              <Lock className="w-3 h-3 mr-2" /> View Audit Logs
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function Home() {
  const { flowState, setFlowState, activeView } = useAppStore();

  // 1. Login Terminal
  if (flowState === 'LOGIN') {
    return <LoginTerminal />;
  }

  // 2. Boot Sequence
  if (flowState === 'BOOT') {
    return <LoadingScreen onComplete={() => setFlowState('REGION')} />;
  }

  // 3. Region Selection
  if (flowState === 'REGION') {
    return <RegionSelector />;
  }

  // 4. Main Dashboard (Shell + Modules)
  return (
    <div className="min-h-screen bg-background bg-grid-small-white font-sans selection:bg-primary selection:text-black flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            {activeView === 'OVERVIEW' && <DashboardView key="overview" />}
            {activeView === 'STRATEGY' && <StrategyBuilderView key="strategy" />}
            {activeView === 'BACKTEST' && <BacktestView key="backtest" />}
            {activeView === 'PORTFOLIO' && <PortfolioView key="portfolio" />}
            {(activeView === 'COMPLIANCE' || activeView === 'EXECUTION') && <ComplianceView key="compliance" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: any, label: string, value: string, sub: string }) {
  return (
    <Card className="p-5 flex items-start justify-between group hover:border-white/20 transition-colors">
      <div>
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{value}</h3>
        <p className="text-xs text-gray-500">{sub}</p>
      </div>
      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
    </Card>
  )
}
