# Base stage
FROM python:3.11-bookworm AS base
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Set environment variables - check this
ENV FLASK_APP=run.py
# Default command to run the Flask application
CMD ["flask", "run", "--host=0.0.0.0"]

# Development stage
FROM base AS development
ENV FLASK_ENV=development
RUN pip install --no-cache-dir -r requirements-dev.txt

# Production stage
FROM base AS production
ENV FLASK_ENV=production
RUN pip install --no-cache-dir gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
