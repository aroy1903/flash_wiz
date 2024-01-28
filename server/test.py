
import mysql.connector
from fastapi import FastAPI
import os
from routes.routes import router as my_router
from dotenv import load_dotenv
import asyncio
load_dotenv()

mydb = None

print(os.getenv("PORT"))


def get_db(db):
    db = mysql.connector.connect(
        host=os.getenv("HOST"),
        user=os.getenv("DB_USERNAME"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("PORT"))

    return db


mydb = get_db(mydb)

mycursor = mydb.cursor()


for x in mycursor:
    print(x)

app = FastAPI()


app.include_router(my_router)
