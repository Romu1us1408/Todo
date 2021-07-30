from flask import Flask
from flask_cors import CORS
from backend.views.tasks_view import TaskView
from backend.views.accounts_view import AccountsView

# from backend.views.accounts_view import AccountsView

app = Flask(__name__)
CORS(app)


def register_api(view, endpoint, url, pk='id', pk_type='int'):
    view_func = view.as_view(endpoint)
    app.add_url_rule(url, defaults={pk: None},
                     view_func=view_func, methods=['GET', ])
    app.add_url_rule(url, view_func=view_func, methods=['POST', ])
    app.add_url_rule(f'{url}<{pk_type}:{pk}>', view_func=view_func,
                     methods=['GET', 'PUT', 'DELETE'])


register_api(TaskView, 'tasks', '/api/tasks/', 'task_id')
register_api(AccountsView, 'accounts', '/api/accounts/', 'account_id')
