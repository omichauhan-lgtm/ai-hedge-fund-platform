import asyncio
import uuid
import json
from datetime import datetime
from src.agents.data_ingestion import DataIngestionAgent, DataIngestionInput
from src.agents.strategy_research import StrategyResearchAgent, StrategyResearchInput
from src.agents.backtester import BacktesterAgent, BacktesterInput
from src.agents.portfolio_architect import PortfolioArchitectAgent, PortfolioInput
from src.agents.execution_planner import ExecutionPlannerAgent, ExecutionInput
from src.models.domain_models import AssetClass

async def main():
    print("🚀 Starting AI Multi-Strategy Fund Architect (MVP)...")
    task_id = str(uuid.uuid4())
    
    # 1. Data Ingestion
    # -----------------
    data_agent = DataIngestionAgent()
    data_input = DataIngestionInput(
        task_id=task_id,
        symbols=["AAPL", "MSFT", "GOOGL", "BTC-USD", "ETH-USD"], # Mixed Asset Class
        asset_class=AssetClass.EQUITIES,
        start_date="2023-01-01",
        end_date="2023-12-31"
    )
    data_output = await data_agent.run(data_input)
    if data_output.status != "SUCCESS":
        print(f"❌ Data Ingestion Failed: {data_output.error}")
        return
    print(f"✅ Data Ingestion Complete. {len(data_output.data.get('raw_data_summary', {}))} assets synced.")

    while True:
        try:
            print("\n🔄 Starting Analysis Cycle...")
            current_time = datetime.utcnow()
            
            # 2. Strategy Research
            # --------------------
            research_agent = StrategyResearchAgent()
            res_input = StrategyResearchInput(
                task_id=str(uuid.uuid4()),
                asset_class=AssetClass.EQUITIES,
                target_symbols=["AAPL", "MSFT", "GOOGL"], 
                num_strategies=5
            )
            research_output = await research_agent.run(res_input)
            strategies = research_output.data.get("strategies", [])
            print(f"   Generated {len(strategies)} strategies.")
            
            # 3. Backtesting
            # --------------
            backtest_agent = BacktesterAgent()
            bt_input = BacktesterInput(
                task_id=str(uuid.uuid4()),
                strategies=strategies,
                start_date="2023-01-01",
                end_date="2023-12-31"
            )
            bt_output = await backtest_agent.run(bt_input)
            ranked_strategies = bt_output.data.get("results", [])
            print(f"   Backtest Complete. Best Sharpe: {ranked_strategies[0]['sharpe_ratio']}")

            # 4. Portfolio Construction
            # -------------------------
            portfolio_agent = PortfolioArchitectAgent()
            port_input = PortfolioInput(
                task_id=str(uuid.uuid4()),
                strategies=ranked_strategies,
                capital=500000 
            )
            port_output = await portfolio_agent.run(port_input)
            active_strategies = port_output.data.get("active_strategies", [])
            
            # 5. Execution Planning
            # ---------------------
            exec_agent = ExecutionPlannerAgent()
            exec_input = ExecutionInput(
                task_id=str(uuid.uuid4()),
                active_strategies=active_strategies
            )
            exec_output = await exec_agent.run(exec_input)
            packets = exec_output.data.get("execution_packets", [])
            
            print(f"   📦 Generated {len(packets)} Execution Packets.")
            # In a real app, we would push these to the Frontend via WebSocket/DB here.
            
            print("⏳ Cycle complete. Sleeping for 60 seconds...")
            await asyncio.sleep(60)
            
        except Exception as e:
            print(f"❌ Error in cycle: {e}")
            await asyncio.sleep(10)

if __name__ == "__main__":
    asyncio.run(main())
