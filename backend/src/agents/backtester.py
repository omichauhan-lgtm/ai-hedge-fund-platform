from .base import BaseAgent, AgentInput, AgentOutput
from ..models.domain_models import StrategySpec
import random
import asyncio

class BacktesterInput(AgentInput):
    strategies: list[dict] # List of StrategySpec dicts
    start_date: str
    end_date: str

class BacktesterAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="BacktesterAgent")

    async def run(self, input_data: BacktesterInput) -> AgentOutput:
        self.log_activity(f"Backtesting {len(input_data.strategies)} strategies...")
        
        results = []
        for strat_dict in input_data.strategies:
            # Simulate processing time
            # await asyncio.sleep(0.1) 
            
            # Mock results calculation
            # In real system, this runs the vectorized backtest engine
            strat_res = self._mock_run_backtest(strat_dict)
            results.append(strat_res)
            
        # Sort by Sharpe Ratio
        results.sort(key=lambda x: x['sharpe_ratio'] or -999, reverse=True)
        
        return AgentOutput(
            task_id=input_data.task_id,
            status="SUCCESS",
            data={"results": results}
        )

    def _mock_run_backtest(self, strat_dict: dict) -> dict:
        """
        Generates realistic-looking random metrics for the strategy.
        """
        # bias towards "bad" strategies (realistic)
        is_profitable = random.random() > 0.7 
        
        if is_profitable:
            sharpe = random.uniform(1.2, 3.5)
            drawdown = random.uniform(0.05, 0.20)
            win_rate = random.uniform(0.51, 0.65)
        else:
            sharpe = random.uniform(-1.0, 0.8)
            drawdown = random.uniform(0.20, 0.60)
            win_rate = random.uniform(0.30, 0.49)
            
        # Update the spec with results
        strat_dict['sharpe_ratio'] = round(sharpe, 2)
        strat_dict['max_drawdown'] = round(drawdown, 2)
        strat_dict['win_rate'] = round(win_rate, 2)
        strat_dict['robustness_score'] = round(random.uniform(0.1, 0.9), 2)
        
        return strat_dict
