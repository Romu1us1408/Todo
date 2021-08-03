from backend.db import db
from sqlalchemy import Column


class Accounts(db.Model):
    __tablename__ = 'accounts'
    fName = db.Column(db.Text)
    lName = db.Column(db.Text)
    email = db.Column(db.Text)
    password = db.Column(db.Text)
    id = db.Column(db.Integer, primary_key=True)
    task = db.relationship('Tasks', lazy=False)


