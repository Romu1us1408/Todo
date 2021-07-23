from backend.db import get_db_conn
from psycopg2.extras import RealDictCursor


class Task_DB():

    def load(self):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
        SELECT * from postgres.public.tasks
        """
        cursor.execute(query)
        data = cursor.fetchall()
        return data

    def save(self, new_task):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
                INSERT INTO postgres.public.tasks (des) 
                 VALUES (%(des)s)"""
        cursor.execute(query,
                       dict(
                           des=new_task['des'])
                       )
        conn.commit()

    def update(self, remove_id):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
                UPDATE postgres.public.tasks 
                SET deleted = true
                WHERE id=(%(remove_id)s)
            """
        cursor.execute(query,
                       dict(
                           remove_id=remove_id)
                       )
        conn.commit()
