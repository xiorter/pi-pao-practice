#!/bin/bash
# Pi PAO Practice Launcher
# Place this file in the same folder as index.html (~/PiPractice/)

cd /home/xiorter/Documents/Memory/PiPractice

# Kill any existing server on port 8000
fuser -k 8000/tcp 2>/dev/null

# Start the server in the background
python3 -m http.server 8000 &
SERVER_PID=$!

# Wait a moment for the server to start
sleep 0.5

echo "Pi PAO server running (PID $SERVER_PID). Close this terminal to stop it."
wait $SERVER_PID
