import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL
)
""")
conn.commit()

def inserir_item(name, description):
    cursor.execute("INSERT INTO items (name, description) VALUES (?, ?)", (name, description))
    conn.commit()

def listar_itens():
    cursor.execute("SELECT * FROM items")
    return cursor.fetchall()

def procurar_item(id):
    cursor.execute("SELECT * FROM items WHERE id = ?", (id,))
    return cursor.fetchone()

def atualizar_item(id, name, description):
    cursor.execute("UPDATE items SET name = ?, description = ? WHERE id = ?", (name, description, id))
    conn.commit()

def apagar_item(id):
    cursor.execute("DELETE FROM items WHERE id = ?", (id,))
    conn.commit()

if __name__ == "__main__":
    inserir_item("Item 1", "Descrição do item 1")
    inserir_item("Item 2", "Descrição do item 2")

    print("Itens:", listar_itens())

    print("Procurando ID 1:", procurar_item(1))

    atualizar_item(1, "Item Atualizado", "Descrição Atualizada")
    print("Após atualização:", listar_itens())

    apagar_item(2)
    print("Após exclusão:", listar_itens())

conn.close()
