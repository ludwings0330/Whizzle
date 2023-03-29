FROM python:3.9.16
WORKDIR /src

COPY .. /src
RUN pip install -r requirements.txt

WORKDIR /app
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
