FROM python:3.9.16
WORKDIR /app

COPY requirements.txt /app
RUN ls
RUN pip install -r requirements.txt

COPY ../app/* /app
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
