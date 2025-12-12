import { create } from 'zustand';

type FlowState = 'LOGIN' | 'BOOT' | 'REGION' | 'DASHBOARD';
type Region = 'USA' | 'INDIA' | 'UK' | 'GLOBAL';
type View = 'OVERVIEW' | 'STRATEGY' | 'BACKTEST' | 'PORTFOLIO' | 'EXECUTION' | 'COMPLIANCE';

interface AppState {
    flowState: FlowState;
    region: Region;
    contextMode: 'DOMESTIC' | 'GLOBAL'; // Toggle
    activeView: View;

    setFlowState: (state: FlowState) => void;
    setRegion: (region: Region) => void;
    setContextMode: (mode: 'DOMESTIC' | 'GLOBAL') => void;
    setActiveView: (view: View) => void;
}

export const useAppStore = create<AppState>((set) => ({
    flowState: 'LOGIN', // Start at Login
    region: 'GLOBAL',
    contextMode: 'GLOBAL',
    activeView: 'OVERVIEW',

    setFlowState: (s) => set({ flowState: s }),
    setRegion: (r) => set({ region: r }),
    setContextMode: (m) => set({ contextMode: m }),
    setActiveView: (v) => set({ activeView: v }),
}));
