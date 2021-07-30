from flask.views import MethodView
from flask import jsonify, request
from marshmallow import ValidationError

from backend.validations.accounts_schema import AccountsSchema


class AccountsView(MethodView):
    def get(self, account_id):
        pass

    def post(self):
        account_schema = AccountsSchema()
        try:
            result = account_schema.load(request.json)
        except ValidationError as e:
            return jsonify(e.messages), 400
        return jsonify({'success': True})

    def delete(self, account_id):
        pass

    def put(self, account_id):
        pass
