from multiprocessing import pool
from dotenv import load_dotenv
import mysql.connector
import os
from flask import Flask, g, jsonify, request
from mysql.connector import Error, pooling
from functools import wraps
from flask_cors import CORS, cross_origin
from upload import upload_file
import json

load_dotenv()


dbconfig = {
    "host": os.getenv("HOST"),
    "user": os.getenv("DB_USERNAME"),
    "password": os.getenv("DB_PASSWORD"),
    "port": os.getenv("PORT"),
    "database": os.getenv("DB")
}

try:
    db_pool = pooling.MySQLConnectionPool(
        pool_name="pool",
        pool_size=5,
        **dbconfig
    )
except Error as e:
    print("error connecting to db")

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.before_request
def get_db():
    try:
        if 'db' not in g:
            g.db = db_pool.get_connection()
            print("Connected to DB")
    except Error as e:
        print('error connecting to db')
        return jsonify({"error": "database connection failed"}), 500


def check_key(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        user_key = request.get_json()
        request_uid = user_key['uid']
        cursor = g.db.cursor()
        query = "SELECT * FROM Users WHERE uid = %s"
        value = (user_key['uid'],)
        cursor.execute(query, value)
        username, uid = None, None
        ob = cursor.fetchone()
        if (ob):
            username, uid = ob
        if (uid != request_uid):
            cursor.close()
            return "Invalid Key"
        cursor.close()
        result = f(*args, **kwargs)
        return result
    return wrapper


def check_key_profile(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        user_key = request.form.to_dict()
        request_uid_obj = eval(user_key['deckname'])
        request_uid = request_uid_obj["uid"]
        cursor = g.db.cursor()
        query = "SELECT * FROM Users WHERE uid = %s"
        value = (request_uid,)
        cursor.execute(query, value)
        username, uid = None, None
        ob = cursor.fetchone()
        if (ob):
            username, uid = ob
        if (uid != request_uid):
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


@app.route("/meow", methods=["POST"])
@cross_origin()
@check_key_profile
def meor():
    return "Meow"


@app.route("/upload_profile", methods=["POST", "OPTIONS"])
@cross_origin()
@check_key_profile
def upload_pfp():

    if 'File' not in request.files:
        print("No files")
        return jsonify({"error": "No files"}), 400
    user_dict = request.form.to_dict()
    request_obj = eval(user_dict['deckname'])
    deck = request_obj['deckName']
    pfp = request.files['File']
    print(pfp.filename)
    if pfp != '':
        print(pfp.headers)

    ret_val = upload_file(pfp, deck)
    if (not ret_val):
        return jsonify({"error": "error uploading files"}), 400
    else:
        return jsonify({"link": ret_val})


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
    if request.is_json:
        data = request.get_json()
        cursor = g.db.cursor()
        query = "INSERT INTO FlashCards (username, question, answer, deck) VALUES (%s, %s, %s, %s)"
        values = (data['uid'], data['question'],
                  data['answer'], data['deck'])
        cursor.execute(query, values)
        g.db.commit()
        cursor.close()
        return jsonify({"card": "added"}), 200
    else:
        return jsonify({"error": "Request must be JSON"}), 400


@app.route("/adddeck", methods=["POST", "OPTIONS"])
@cross_origin()
@check_key
def add_deck():
    if request.is_json:
        data = request.get_json()
        cursor = g.db.cursor()
        query = "INSERT INTO Decks (deck, profile_picture, email) VALUES (%s, %s, %s)"
        values = (data['deckName'], data['link'],
                  data['email'])
        cursor.execute(query, values)
        g.db.commit()
        cursor.close()
        return jsonify({"deck": "added"}), 200
    else:
        return jsonify({"error": "Request must be JSON"}), 400


@app.route("/alldecks", methods=["GET", "POST"])
@cross_origin()
@check_key
def return_decks():
    cursor = g.db.cursor()
    cursor.execute("SELECT * from Decks")
    result = cursor.fetchall()
    cursor.close()
    return result


@app.route("/getdeck")
@cross_origin()
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


@app.route("/search/<search_key>", methods=["GET", "POST"])
@cross_origin()
@check_key
def search_decks(search_key):
    print(search_key)
    cursor = g.db.cursor()
    query = "SELECT * FROM FlashCards WHERE deck LIKE %s"
    value = (search_key + "%",)
    cursor.execute(query, value)
    result = cursor.fetchall()
    cursor.close()
    return result


@app.route("/userdecks")
@cross_origin()
@check_key
def return_user_decks():

    data = request.get_json()
    cursor = g.db.cursor()
    query = "SELECT * from Decks WHERE email = %s"
    value = (data['email'],)
    cursor.execute(query, value)
    result = cursor.fetchall()
    cursor.close()

    return result


@app.teardown_request
def teardown_request_function(error=None):
    if 'db' in g:
        g.db.close()


if __name__ == '__main__':
    app.run(debug=True)
