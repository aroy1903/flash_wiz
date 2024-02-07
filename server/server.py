from email import message
from dotenv import load_dotenv
import mysql.connector
import os
from flask import Flask, g, redirect, jsonify, request
from mysql.connector import Error
from networkx import is_connected


load_dotenv()


app = Flask(__name__)


@app.before_request
def get_db():
    try:
        g.db = mysql.connector.connect(
            host=os.getenv("HOST"),
            user=os.getenv("DB_USERNAME"),
            password=os.getenv("DB_PASSWORD"),
            port=os.getenv("PORT"),
            database=os.getenv("DB")
        )
        if g.db.is_connected():
            print("Connected to db")

    except Error as e:

        print('error connecting to db')
        return jsonify({"error": "database connection failed"}), 500


@app.route("/newuser", methods=["POST"])
def hello_world():
    if request.is_json:
        data = request.get_json()
        cursor = g.db.cursor()
        query = "INSERT INTO Users (username, uid) VALUES (%s, %s)"
        values = (data['username'], int(data['uid']))
        cursor.execute(query, values)
        g.db.commit()
        cursor.close()
        return jsonify({"user": "added"}), 200
    else:
        return jsonify({"error": "Request must be JSON"}), 400


@app.route("/allusers")
def return_users():
    cursor = g.db.cursor()
    cursor.execute("SELECT * from Users")
    result = cursor.fetchone()
    print(result)
    return 'All Users'


@app.teardown_request
def teardown_request_function(error=None):
    db = getattr(g, "db", None)
    if db is not None:
        db.close()


if __name__ == '__main__':
    app.run()
