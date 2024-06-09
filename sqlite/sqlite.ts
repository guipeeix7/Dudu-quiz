import * as SQLite from "expo-sqlite";

//Connection is initialised globally
const db = SQLite.openDatabase("myDatabase.db");

/**
 * If you have a existing database this is where you would import it,
 * otherwise this is where you would create tables and seed DB.
 */
export function initDatabase(db: SQLite.Database) {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255),  email VARCHAR(255), phone VARCHAR(21) ); "
    );

  });
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS user_response (userId INTEGER, questionId INTEGER,  isCorrect INTEGER);"
    );

  });
}

export default db;
