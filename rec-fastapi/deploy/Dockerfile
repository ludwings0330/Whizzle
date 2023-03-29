FROM python:3.9.16
WORKDIR /src

COPY ../app /src

RUN echo "$pwd"
RUN ls -l

WORKDIR app

RUN pwd
RUN ls

RUN pip install -r requirements.txt
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
