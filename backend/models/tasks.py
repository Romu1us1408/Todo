from backend.db import db
from sqlalchemy import Column

class Tasks(db.Model):

    __tablename__ = 'tasks'
    id = Column(db.Integer, primary_key=True)
    des = Column(db.Text)
    deleted = Column(db.Boolean, default=False)
    done = Column(db.Boolean, default=False)

    def to_json(self):
        return dict(
            id=self.id,
            des=self.des,
            deleted=self.deleted,
            done=self.done
        )


