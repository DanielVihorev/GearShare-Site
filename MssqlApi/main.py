import pyodbc
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI()

# Replace with your actual MSSQL connection details
server = 'gearshareios.cnjbhvhk2aaw.us-east-1.rds.amazonaws.com'      # e.g., 'gearshareios.abcdefg12345.us-east-1.rds.amazonaws.com'
database = 'gearshareios'           # from your config
username = 'admin'                  # your master username
password = 'tp3V0UI2epmG19aA'        # your master password
driver = '{ODBC Driver 17 for SQL Server}'
TrustServerCertificate='yes'
Encrypt='yes'

conn_str = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password};Encrypt=yes;TrustServerCertificate=yes;'

class User(BaseModel):
    username: str
    email: str
    created_at: str  # e.g., '2025-06-19T07:07:00Z'

def get_db_connection():
    return pyodbc.connect(conn_str)

@app.post("/users/", status_code=status.HTTP_201_CREATED)
def create_user(user: User):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Users (username, email, created_at) VALUES (?, ?, ?)",
            user.username, user.email, user.created_at
        )
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "User created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
