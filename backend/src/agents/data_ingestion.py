from .base import BaseAgent, AgentInput, AgentOutput
from ..models.domain_models import AssetClass
import yfinance as yf
import pandas as pd
from typing import List, Dict, Any, Optional
import asyncio

class DataIngestionInput(AgentInput):
    symbols: List[str]
    asset_class: AssetClass
    start_date: str
    end_date: Optional[str] = None
    interval: str = "1d"

class DataIngestionAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="DataIngestionAgent")

    async def run(self, input_data: DataIngestionInput) -> AgentOutput:
        self.log_activity(f"Fetching data for {input_data.symbols}...")
        
        try:
            # MVP: Use yfinance for quick prototyping
            # Production: Switch to generic interface wrapping CCXT / Polygon
            
            # Run blocking call in executor
            loop = asyncio.get_event_loop()
            data = await loop.run_in_executor(None, self._fetch_yfinance, input_data)
            
            # Check if empty
            if not data:
                return AgentOutput(
                    task_id=input_data.task_id,
                    status="FAILURE",
                    error="No data returned from provider."
                )

            self.log_activity(f"Successfully fetched {len(data)} records.")
            return AgentOutput(
                task_id=input_data.task_id,
                status="SUCCESS",
                data={"raw_data_summary": data} # In real app, store to DB/Parquet and return path
            )
            
        except Exception as e:
            self.log_error(str(e))
            return AgentOutput(
                task_id=input_data.task_id,
                status="FAILURE",
                error=str(e)
            )

    def _fetch_yfinance(self, input_data: DataIngestionInput) -> Dict[str, Any]:
        """Helper to fetch from YF."""
        tickers = input_data.symbols
        # Ticker string space separated
        tickers_str = " ".join(tickers)
        
        df = yf.download(
            tickers=tickers_str, 
            start=input_data.start_date, 
            end=input_data.end_date, 
            interval=input_data.interval,
            group_by='ticker',
            timeout=10
        )
        
        # Simple summary for MVP return
        if df.empty:
            return {}
        
        # Convert complex multi-index DF to json-able dict structure for MVP passing
        # (In production, we'd save to Parquet and pass the file path)
        result = {}
        for ticker in tickers:
            try:
                # Handle single ticker vs multi ticker structure in yfinance
                if len(tickers) > 1:
                    ticker_df = df[ticker]
                else:
                    ticker_df = df
                
                result[ticker] = {
                    "count": len(ticker_df),
                    "last_price": float(ticker_df['Close'].iloc[-1]) if not ticker_df.empty else 0.0,
                    "start": str(ticker_df.index[0]),
                    "end": str(ticker_df.index[-1])
                }
            except KeyError:
                self.log_error(f"Ticker {ticker} not found in response.")
                
        return result
