from dotenv import load_dotenv
import mysql.connector
import os
from flask import Flask, g, redirect, jsonify, request
from mysql.connector import Error
from functools import wraps

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


def check_key(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        user_key = request.get_json()
        request_uid = user_key['uid']
        cursor = g.db.cursor()
        query = "SELECT * FROM Users WHERE username = %s"
        value = (user_key['username'],)
        cursor.execute(query, value)
        username, uid = cursor.fetchone()
        if (uid != request_uid):
            return "Invalid Key"
        print(uid)
        cursor.close()
        result = f(*args, **kwargs)
        return result
    return wrapper


@app.route("/test", methods=["POST"])
@check_key
def say_hi():
    return "Hello"


@app.route("/newuser", methods=["POST"])
def hello_world():
    if request.is_json:
        data = request.get_json()
        cursor = g.db.cursor()
        query = "INSERT INTO Users (username, uid) VALUES (%s, %s)"
        values = (data['username'], data['uid'])
        cursor.execute(query, values)
        g.db.commit()
        cursor.close()
        return jsonify({"user": "added"}), 200
    else:
        return jsonify({"error": "Request must be JSON"}), 400


@app.route("/allusers")
@check_key
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
    app.run(debug=True)
