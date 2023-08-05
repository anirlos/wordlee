from fastapi import FastAPI
from pydantic import baseModel
from fastapi/staticfiles import StaticFiles


app = FastAPI()

answer='GUSOL'

@app.get(`/answer`)
def get_answer():
    return {'answer':answer}

app.mount("/", StaticFiles(directory="static", html=True), name="static")