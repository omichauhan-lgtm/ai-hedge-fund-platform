#!/bin/bash
echo "🚀 Starting AI Hedge Fund Platform..."

# Start Backend in background
echo "🟢 Starting Python AI Core (Backend)..."
cd backend
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Start Frontend
echo "🟢 Starting Next.js Command Center (Frontend)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Platform is running!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "Press [CTRL+C] to stop both services."

# Wait for user interrupt
trap "echo '🛑 Stopping services...'; kill $BACKEND_PID; kill $FRONTEND_PID; exit" INT
wait
