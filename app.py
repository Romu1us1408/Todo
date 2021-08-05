import os
import bcrypt
from flask import Flask
from flask_cors import CORS
from flask_jwt import JWT
from backend.models.accounts import Accounts
from backend.views.tasks_view import TaskView
from backend.views.accounts_view import AccountsView
from backend.db import db

app = Flask(__name__)
CORS(app)
config_file_name = os.environ['CONFIG']

app.config.from_json(config_file_name)
db.init_app(app)


def authentication(username, password):
    user = db.session.query(Accounts).filter(Accounts.email == username).one()
    if bcrypt.checkpw(password.encode(), user.password.encode()):
        return user


def identity(identity):
    user = db.session.query(Accounts).filter(Accounts.id == identity['identity']).one()
    return user


JWT(app, authentication, identity)


def register_api(view, endpoint, url, pk='id', pk_type='int'):
    view_func = view.as_view(endpoint)
    app.add_url_rule(url, defaults={pk: None},
                     view_func=view_func, methods=['GET', ])
    app.add_url_rule(url, view_func=view_func, methods=['POST', ])
    app.add_url_rule(f'{url}<{pk_type}:{pk}>', view_func=view_func,
                     methods=['GET', 'PUT', 'DELETE'])


register_api(TaskView, 'tasks', '/api/tasks/', 'task_id')
register_api(AccountsView, 'accounts', '/api/accounts/', 'account_id')
