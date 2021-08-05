from flask.views import MethodView
from flask import jsonify, request
from marshmallow import ValidationError
from backend.models.accounts import Accounts
from backend.validations.accounts_schema import AccountsSchema
from backend.db import db
import bcrypt


class AccountsView(MethodView):

    def get(self, account_id):
        schema = AccountsSchema(only=['fName', 'lName', 'email'])
        this_account = db.session.query(Accounts)\
            .filter(Accounts.id == account_id)\
            .first()
        account_json = schema.dump(this_account)
        task_json = [task.to_json() for task in this_account.task]
        return jsonify(dict(account=account_json, tasks=task_json))

    def post(self):
        account_schema = AccountsSchema()
        try:
            result = account_schema.load(request.json)
            new_account = Accounts(
                fName=result['fName'],
                lName=result['lName'],
                email=result['email'],
                password=result['password']
            )
            new_account.password = bcrypt.hashpw(new_account.password.encode(), bcrypt.gensalt()).decode()
            db.session.add(new_account)
            db.session.commit()
        except ValidationError as e:
            return jsonify(e.messages), 400
        return jsonify({'success': True})

    def delete(self, account_id):
        pass

    def put(self, account_id):
        pass
