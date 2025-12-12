from .base import BaseAgent, AgentInput, AgentOutput
from ..models.domain_models import ExecutionPacket, Signal
from datetime import datetime
import random
import uuid

class ExecutionInput(AgentInput):
    active_strategies: list[dict] # Strategies with capital allocations

class ExecutionPlannerAgent(BaseAgent):
    """
    Converts Portfolio Allocations -> Live Signals -> Execution Packets
    """
    def __init__(self):
        super().__init__(name="ExecutionPlannerAgent")

    async def run(self, input_data: ExecutionInput) -> AgentOutput:
        self.log_activity("Generating execution packets for active strategies...")
        
        packets = []
        
        for strat in input_data.active_strategies:
            # 1. Simulate Signal Generation (Strategy "wakes up" and checks market)
            # In a real system, the Strategy/Signal Agent does this.
            # Here we combine it for the MVP flow.
            
            signal = self._mock_signal_generation(strat)
            
            if signal:
                # 2. Compose Execution Packet
                packet = self._create_packet(strat, signal)
                packets.append(packet.model_dump())
        
        return AgentOutput(
            task_id=input_data.task_id,
            status="SUCCESS",
            data={"execution_packets": packets}
        )

    def _mock_signal_generation(self, strat: dict) -> dict:
        """Randomly decides if a strategy wants to trade right now."""
        if random.random() > 0.5: # 50% chance of a signal today
            side = random.choice(["BUY", "SELL"])
            return {
                "side": side,
                "strength": random.uniform(0.5, 1.0)
            }
        return None

    def _create_packet(self, strat: dict, signal: dict) -> ExecutionPacket:
        # Determine quantity based on allocated capital
        # Mock price for calculation
        price = 150.0 
        capital = strat.get('allocated_capital', 10000)
        
        # Simple sizing: Use 10% of alloc capital per trade
        trade_value = capital * 0.10
        qty = int(trade_value / price)
        if qty < 1: qty = 1
        
        return ExecutionPacket(
            id=str(uuid.uuid4()),
            timestamp=datetime.utcnow(),
            strategy_id=strat['id'],
            symbol=strat['target_symbols'][0], # Just pick first
            side=signal['side'],
            quantity=qty,
            limit_price=price, # Market/Limit
            options={
                "stop_loss": price * 0.95 if signal['side'] == "BUY" else price * 1.05,
                "take_profit": price * 1.10 if signal['side'] == "BUY" else price * 0.90
            },
            status="PENDING_APPROVAL",
            rationale=f"Strategy {strat['name']} triggered {signal['side']} signal (Strength: {signal['strength']:.2f}) based on logic."
        )
