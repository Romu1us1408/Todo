from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


def load_all_tasks():
    with open('backend/data.json', 'r') as file:
        raw_data = json.loads(file.read())
        return raw_data


def write_tasks(tasks):
    with open('backend/data.json', 'w') as file:
        file.write(json.dumps(tasks))
        return tasks


def generate_id(tasks):
    new_id = max(task["id"] for task in tasks) + 1
    return new_id


def deleted_check(raw_data):
    not_deleted_tasks = []
    for task in raw_data:
        if not task["deleted"]:
            not_deleted_tasks.append(task)
    return not_deleted_tasks


@app.route("/api/tasks", methods=['GET'])
def get_tasks():
    raw_data = load_all_tasks()
    not_deleted_tasks = []
    for task in raw_data:
        if not task["deleted"]:
            not_deleted_tasks.append(task)
    return jsonify(not_deleted_tasks)


@app.route("/api/tasks/<int:task_id>", methods=['GET'])
def one_task(task_id):
    raw_data = load_all_tasks()
    requested_task = next((task for task in raw_data if task['id'] == task_id), None)
    return jsonify(requested_task)


@app.route("/api/tasks/<int:task_id>", methods=['DELETE'])
def delete_task(task_id):
    raw_data = load_all_tasks()
    for task in raw_data:
        if task['id'] == task_id:
            task['deleted'] = True
            break
    not_deleted_tasks = deleted_check(raw_data)
    write_tasks(raw_data)
    return jsonify(not_deleted_tasks)


@app.route("/api/tasks", methods=['POST'])
def create_tasks():
    new_task = []
    new_task = json.loads(request.data)
    all_tasks = load_all_tasks()
    new_task["id"] = generate_id(all_tasks)
    new_task["deleted"] = False
    new_task["done"] = False
    all_tasks.append(new_task)
    write_tasks(all_tasks)
    return jsonify(deleted_check(all_tasks))
