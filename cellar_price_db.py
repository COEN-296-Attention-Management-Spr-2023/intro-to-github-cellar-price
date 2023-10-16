import sqlite3

conn = sqlite3.connect("cellar_price.db")
cur = conn.cursor()
print("Successfully Connected to the Cellar Price Database")
cursor.execute("""
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL
    )
""")






