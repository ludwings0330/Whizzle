FROM python:3.9.16
WORKDIR /src

# docker build -t whizzle/rec -f ./rec-fastapi/deploy/Dockerfile . 로 빌드하기 때문에 COPY시 경로에 주의해야 한다.
COPY ./rec-fastapi/ /src
WORKDIR app

RUN pip install --upgrade pip && \
    pip install --no-cache-dir --upgrade -r requirements.txt

ENTRYPOINT ["uvicorn", "main:app", \
             "--host", "0.0.0.0", \
             "--port", "8000", \
             "--env-file", "/src/config/.env", \
             "--env-file", "/src/config/.env.prod"]