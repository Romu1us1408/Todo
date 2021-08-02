from flask.views import MethodView
from flask import jsonify, request
import json
from backend.models.tasks import Tasks
from backend.db import db


def deleted_check(raw_data):
    not_deleted_tasks = []
    for task in raw_data:
        if not task["deleted"]:
            not_deleted_tasks.append(task)
    return not_deleted_tasks


class TaskView(MethodView):

    def get(self, task_id):
        raw_tasks = db.session.query(Tasks).all()
        print(raw_tasks)
        resp = [t.to_json() for t in raw_tasks]
        return jsonify(deleted_check(resp))

    def delete(self, task_id):
        db.session.query(Tasks).filter(Tasks.id == task_id).update({Tasks.deleted: True})
        db.session.commit()
        raw_tasks = db.session.query(Tasks).all()
        resp = [t.to_json() for t in raw_tasks]
        return jsonify(deleted_check(resp))

    def post(self):
        try:
            result = json.loads(request.data)
            new_task = Tasks(
                des=result['des'],
                deleted=False,
                done=False
            )
            db.session.add(new_task)
            db.session.commit()

        except Exception as e:
            return jsonify({'success': True})
        return self.get(None)
