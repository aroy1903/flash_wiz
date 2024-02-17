from dotenv import load_dotenv
import mysql.connector
import os
from flask import Flask, g, jsonify, request
from mysql.connector import Error
from functools import wraps
from flask_cors import CORS, cross_origin

load_dotenv()


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


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
        request_email = user_key['email']
        cursor = g.db.cursor()
        query = "SELECT * FROM Users WHERE username = %s"
        value = (user_key['email'],)
        cursor.execute(query, value)
        username, uid = cursor.fetchone()
        if (username != request_email):
            cursor.close()
            return "Invalid Key"
        cursor.close()
        result = f(*args, **kwargs)
        return result
    return wrapper


@app.route("/test", methods=["POST"])
@check_key
def say_hi():
    return "Hello"


@app.route("/newuser", methods=["POST"])
@cross_origin()
def create_user():
    if request.is_json:
        data = request.get_json()
        cursor = g.db.cursor()
        query = "INSERT INTO Users (username, uid) VALUES (%s, %s)"
        values = (data['username']['email'], data['username']['uid'])
        cursor.execute(query, values)
        g.db.commit()
        cursor.close()
        return jsonify({"user": "added"}), 200
    else:
        return jsonify({"error": "Request must be JSON"}), 400


@app.route("/addcard", methods=["POST", "OPTIONS"])
@cross_origin()
@check_key
def add_card():
    print("Adding card")
    if request.is_json:
        data = request.get_json()
        cursor = g.db.cursor()
        query = "INSERT INTO FlashCards (username, question, answer, deck) VALUES (%s, %s, %s, %s)"
        values = (data['username'], data['question'],
                  data['answer'], data['deck'])
        cursor.execute(query, values)
        g.db.commit()
        cursor.close()
        return jsonify({"card": "added"}), 200
    else:
        return jsonify({"error": "Request must be JSON"}), 400


@app.route("/alldecks")
@check_key
def return_decks():
    cursor = g.db.cursor()
    cursor.execute("SELECT * from FlashCards")
    result = cursor.fetchall()
    cursor.close()
    return result


@app.route("/getdeck")
@check_key
def return_single_deck():
    data = request.get_json()
    cursor = g.db.cursor()
    query = "SELECT * FROM FlashCards WHERE username = %s AND deck = %s"
    value = (data['username', data['deck']])
    cursor.execute(query, value)
    result = cursor.fetchall()
    cursor.close()
    return result


@app.route("/search/<search_key>")
@check_key
def search_decks(search_key):
    cursor = g.db.cursor()
    query = "SELECT * FROM FlashCards WHERE deck LIKE %s"
    value = (search_key + "%",)
    cursor.execute(query, value)
    result = cursor.fetchall()
    cursor.close()
    return result


@app.route("/userdecks")
@check_key
def return_user_decks():

    data = request.get_json()
    cursor = g.db.cursor()
    query = "SELECT * from FlashCards WHERE username = %s"
    value = (data['username'],)
    cursor.execute(query, value)
    result = cursor.fetchall()
    cursor.close()

    return result


@app.teardown_request
def teardown_request_function(error=None):
    db = getattr(g, "db", None)
    if db is not None:
        db.close()


if __name__ == '__main__':
    app.run(debug=True)
