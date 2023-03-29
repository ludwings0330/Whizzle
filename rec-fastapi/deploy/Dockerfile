FROM python:3.9.16
COPY ../ /app
WORKDIR /app
RUN pwd
RUN ls
RUN pip install -r /app/requirements.txt
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
