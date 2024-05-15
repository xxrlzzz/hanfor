import flask
import logging

from flask import Flask, render_template, request, jsonify, make_response, json


app = Flask(__name__)

logging.basicConfig(
    format='[%(asctime)s %(filename)s:%(lineno)d] %(levelname)s - %(message)s',
    datefmt='%y-%m-%d %H:%M:%S',
    level=logging.DEBUG
)


@app.route('/')
def index():
    logging.info("here")
    default_cols = [
        {'name': 'Pos', 'target': 1},
        {'name': 'Id', 'target': 2},
        {'name': 'Description', 'target': 3},
        {'name': 'Type', 'target': 4},
        {'name': 'Tags', 'target': 5},
        {'name': 'Status', 'target': 6},
        {'name': 'Formalization', 'target': 7}
    ]
    return "hello"

if __name__ == '__main__':
    app.run(**{
        'host': '127.0.0.1',
        'port': 5001
    })