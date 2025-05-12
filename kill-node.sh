#!/bin/bash
# Kill any process using port 3000
sudo lsof -t -i:3000 | xargs kill -9
