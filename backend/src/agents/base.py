from abc import ABC, abstractmethod
from typing import Any, Dict, Optional
from pydantic import BaseModel
import logging

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AgentInput(BaseModel):
    """Base schema for agent inputs."""
    task_id: str
    params: Dict[str, Any] = {}

class AgentOutput(BaseModel):
    """Base schema for agent outputs."""
    task_id: str
    status: str # SUCCESS, FAILURE, PENDING
    data: Dict[str, Any] = {}
    error: Optional[str] = None

class BaseAgent(ABC):
    """
    Abstract Base Class for all AI Agents in the system.
    Ensures modularity and standardized communication.
    """
    
    def __init__(self, name: str):
        self.name = name
        self.logger = logging.getLogger(f"Agent.{name}")
    
    @abstractmethod
    async def run(self, input_data: AgentInput) -> AgentOutput:
        """
        Main execution logic for the agent.
        Must be implemented by subclasses.
        """
        pass
    
    def log_activity(self, message: str):
        self.logger.info(f"[{self.name}] {message}")

    def log_error(self, message: str):
        self.logger.error(f"[{self.name}] ERROR: {message}")
