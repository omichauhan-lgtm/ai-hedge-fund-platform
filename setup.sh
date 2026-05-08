#!/bin/bash
echo "🚀 Setting up AI Hedge Fund Platform..."

# Setup Backend
echo "📦 Setting up Backend Environment..."
cd backend
python -m venv venv

# OS-specific activation
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

pip install -r requirements.txt
cd ..

# Setup Frontend
echo "📦 Setting up Frontend Environment..."
cd frontend
npm install
cd ..

echo "✅ Setup Complete! Run './run.sh' to start the platform."
