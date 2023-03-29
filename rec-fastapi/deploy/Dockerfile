FROM python:3.9.16
#WORKDIR /app

COPY ../requirements.txt /app
RUN ls /app
RUN pip install -r /app/requirements.txt

COPY ../app /app
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
