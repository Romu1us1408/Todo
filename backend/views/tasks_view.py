from flask.views import MethodView
from flask import jsonify, request
import json
from backend.models.tasks import Tasks
from backend.db import db
from flask_jwt import jwt_required, current_identity


def deleted_check(raw_data):
    not_deleted_tasks = []
    for task in raw_data:
        if not task["deleted"]:
            not_deleted_tasks.append(task)
    return not_deleted_tasks


class TaskView(MethodView):

    @jwt_required()
    def get(self, task_id):
        if task_id is None:
            raw_tasks = db.session.query(Tasks).filter(Tasks.task_id == current_identity.id).all()
            print(raw_tasks)
            resp = [t.to_json() for t in raw_tasks]
            return jsonify(deleted_check(resp))

    @jwt_required()
    def delete(self, task_id):
        db.session.query(Tasks).filter(Tasks.id == task_id).update({Tasks.deleted: True})
        db.session.commit()
        raw_tasks = db.session.query(Tasks).filter(Tasks.task_id == current_identity.id).all()
        resp = [t.to_json() for t in raw_tasks]
        return jsonify(deleted_check(resp))

    @jwt_required()
    def post(self):
        try:
            result = json.loads(request.data)
            new_task = Tasks(
                des=result['des'],
                task_id=current_identity.id,
                deleted=False,
                done=False
            )
            db.session.add(new_task)
            db.session.commit()
            raw_tasks = db.session.query(Tasks).filter(Tasks.task_id == current_identity.id).all()
            resp = [t.to_json() for t in raw_tasks]
            return jsonify(deleted_check(resp))
        except Exception as e:
            return jsonify({'success': False})
