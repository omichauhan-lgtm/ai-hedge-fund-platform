from .base import BaseAgent, AgentInput, AgentOutput
from ..models.domain_models import MarketRegime, RegimeType
import random

class PortfolioInput(AgentInput):
    strategies: list[dict] # Ranked strategies
    capital: float = 100000.0
    risk_tolerance: str = "MODERATE" # AGGRESSIVE, MODERATE, CONSERVATIVE

class PortfolioArchitectAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="PortfolioArchitectAgent")

    async def run(self, input_data: PortfolioInput) -> AgentOutput:
        self.log_activity("Constructing portfolio from top strategies...")
        
        # 1. Filter: Take top 3 strategies with Sharpe > 1.0
        candidates = [s for s in input_data.strategies if s.get('sharpe_ratio', 0) > 1.0]
        selected = candidates[:3]
        
        if not selected:
             return AgentOutput(
                task_id=input_data.task_id,
                status="WARNING",
                data={"message": "No strategies met the quality threshold.", "allocation": {}}
            )

        # 2. Risk Parity Allocation (Mocked)
        # In real world: inverse volatility weighting or optimization
        # Here: Equal weight for MVP
        weight = 1.0 / len(selected)
        allocation = {}
        
        for strat in selected:
            # Add metadata about allocation
            strat['target_weight'] = weight
            strat['allocated_capital'] = input_data.capital * weight
            allocation[strat['id']] = {
                "weight": weight, 
                "capital": input_data.capital * weight,
                "strategy_name": strat['name']
            }
            
        self.log_activity(f"Allocated capital across {len(selected)} strategies.")
        
        return AgentOutput(
            task_id=input_data.task_id,
            status="SUCCESS",
            data={
                "portfolio_summary": {
                    "total_capital": input_data.capital,
                    "strategy_count": len(selected),
                    "diversification_score": 0.8 # Mock
                },
                "allocation": allocation,
                "active_strategies": selected
            }
        )
