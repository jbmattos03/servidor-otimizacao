@echo off
REM Setup Python virtual environment
powershell -Command "python -m venv venv"

REM Activate the virtual environment
call venv\Scripts\activate.bat

REM Install required packages
powershell -Command "pip install -r requirements.txt"