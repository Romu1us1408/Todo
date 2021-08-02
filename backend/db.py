import psycopg2
from flask_sqlalchemy import SQLAlchemy


def get_db_conn():
    return psycopg2.connect(
        host="localhost",
        database="postgres",
        port=5432,
        user="luke",
        password="admin"
    )


db = SQLAlchemy()
