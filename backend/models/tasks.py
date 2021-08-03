from backend.db import db
from sqlalchemy import Column


class Tasks(db.Model):
    __tablename__ = 'tasks'
    id = Column(db.Integer, primary_key=True)
    des = Column(db.Text)
    deleted = Column(db.Boolean, default=False)
    done = Column(db.Boolean, default=False)
    task_id = Column('fk_account_id',
                     db.Integer,
                     db.ForeignKey('accounts.id'),
                     nullable=True,
                     )
    account = db.relationship('Accounts', lazy=False)

    def to_json(self):
        return dict(
            id=self.id,
            des=self.des,
            deleted=self.deleted,
            done=self.done
        )
