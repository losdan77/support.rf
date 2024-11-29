FROM python:3.10

RUN mkdir /backend

WORKDIR /backend

COPY requeriments.txt .

RUN pip install -r requeriments.txt

COPY . .

RUN chmod a+x /backend/docker/*.sh

CMD [ "gunicorn", "backend.main:app", "--workers", "1", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind=0.0.0.0:8000" ]
