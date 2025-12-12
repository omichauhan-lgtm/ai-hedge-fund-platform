# AI Hedge Fund Platform

**Autonomous Hedge-Fund-as-a-Service (HFaaS) Operating System.**
A complete financial ecosystem integrating a Python-based AI Core with a Next.js High-Frequency Trading Interface.

## 🏗️ Architecture

This Monorepo contains:

### 1. `backend/` (The Brain)
*   **Tech**: Python, FastAPI, LangGraph, Pandas, Scikit-learn.
*   **Role**: Autonomous Agents for Data Ingestion, Strategy Research, Backtesting, Risk Management (Risk Parity), and Execution Signal generation.
*   **Run**: `python main.py`

### 2. `frontend/` (The Face)
*   **Tech**: Next.js 14, Tailwind CSS, Framer Motion, Zustand.
*   **Role**: "Contra-style" Command Center for investors/operators. Features a "Financial OS" experience with Boot Sequence, Region Selection, and Real-time Strategy Monitoring.
*   **Run**: `npm run dev`

## 🚀 Quick Start

1.  **Start the Brain**:
    ```bash
    cd backend
    pip install -r requirements.txt
    python main.py
    ```

2.  **Start the Face**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## 📜 License
Proprietary & Confidential.
