from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from backend.Task_DB import Task_DB

app = Flask(__name__)
CORS(app)


def deleted_check(raw_data):
    not_deleted_tasks = []
    for task in raw_data:
        if not task["deleted"]:
            not_deleted_tasks.append(task)
    return not_deleted_tasks


@app.route("/api/tasks", methods=['GET'])
def get_tasks():
    raw_data = Task_DB().load()
    return jsonify(deleted_check(raw_data))


@app.route("/api/tasks/<int:task_id>", methods=['GET'])
def one_task(task_id):
    raw_data = Task_DB().load()
    requested_task = next((task for task in raw_data if task['id'] == task_id), None)
    return jsonify(requested_task)


@app.route("/api/tasks/<int:task_id>", methods=['DELETE'])
def delete_task(task_id):
    Task_DB().update(task_id)
    raw_data = Task_DB().load()
    return jsonify(deleted_check(raw_data))


@app.route("/api/tasks", methods=['POST'])
def create_tasks():
    new_task = json.loads(request.data)
    _TaskTB = Task_DB()
    _TaskTB.save(new_task)
    return jsonify(deleted_check(_TaskTB.load()))
