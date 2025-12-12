from .base import BaseAgent, AgentInput, AgentOutput
from ..models.domain_models import StrategySpec, StrategyType, AssetClass
import random
import uuid

class StrategyResearchInput(AgentInput):
    asset_class: AssetClass
    target_symbols: list[str]
    num_strategies: int = 5

class StrategyResearchAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="StrategyResearchAgent")

    async def run(self, input_data: StrategyResearchInput) -> AgentOutput:
        self.log_activity(f"Generating {input_data.num_strategies} strategies for {input_data.target_symbols}...")
        
        strategies = []
        for _ in range(input_data.num_strategies):
            strat = self._generate_random_strategy(input_data.asset_class, input_data.target_symbols)
            strategies.append(strat.model_dump())
            
        return AgentOutput(
            task_id=input_data.task_id,
            status="SUCCESS",
            data={"strategies": strategies}
        )

    def _generate_random_strategy(self, asset_class: str, symbols: list[str]) -> StrategySpec:
        """
        deterministic logic to generate 'valid' looking strategy specs
        based on common quant templates.
        """
        stype = random.choice(list(StrategyType))
        
        params = {}
        name = ""
        description = ""
        
        if stype == StrategyType.MOMENTUM:
            window = random.choice([14, 20, 50, 200])
            threshold = random.choice([0.01, 0.02, 0.05])
            name = f"MOM_Window{window}_Thresh{int(threshold*100)}"
            description = f"Momentum strategy buying when price > {window}d MA by {threshold*100}%"
            params = {"lookback_window": window, "buy_threshold": threshold}
            
        elif stype == StrategyType.MEAN_REVERSION:
            window = random.choice([10, 20, 30])
            std_dev = random.choice([2.0, 2.5, 3.0])
            name = f"BB_Rev_W{window}_SD{std_dev}"
            description = f"Bollinger Band Mean Reversion: Buy if price < lower band ({std_dev} std)"
            params = {"window": window, "std_dev": std_dev}
            
        elif stype == StrategyType.ARBITRAGE:
            name = "StatArb_Pairs_basic"
            description = "Statistical Arbitrage between correlated pairs"
            params = {"z_score_trigger": 2.0, "stop_loss_z": 4.0}
            
        else: # ML
            name = "LSTM_Trend_V1"
            description = "Predictive trend following using LSTM on OHLCV"
            params = {"model_path": "models/lstm_v1.pt", "confidence_threshold": 0.65}
            
        return StrategySpec(
            id=str(uuid.uuid4()),
            name=name,
            description=description,
            strategy_type=stype,
            asset_class=asset_class,
            target_symbols=symbols, # Apply to all for now
            parameters=params
        )
