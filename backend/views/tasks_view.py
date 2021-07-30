from flask.views import MethodView
from flask import jsonify, request
import json

from backend.Task_DB import Task_DB


def deleted_check(raw_data):
    not_deleted_tasks = []
    for task in raw_data:
        if not task["deleted"]:
            not_deleted_tasks.append(task)
    return not_deleted_tasks


class TaskView(MethodView):

    def get(self, task_id):
        raw_data = Task_DB().load()
        return jsonify(deleted_check(raw_data))

    def delete(self, task_id):
        Task_DB().update(task_id)
        raw_data = Task_DB().load()
        return jsonify(deleted_check(raw_data))

    def post(self):
        new_task = json.loads(request.data)
        _TaskTB = Task_DB()
        _TaskTB.save(new_task)
        return jsonify(deleted_check(_TaskTB.load()))
