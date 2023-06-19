from fastapi import FastAPI

app = FastAPI()

groups = [
    { "id": 1, "title": "Завтрак" },
    { "id": 2, "title": "Обед" },
    { "id": 3, "title": "Ужин" },
]

@app.get('/groups')
def hello():
    return groups

@app.get('/')
def test():
    return "test World"