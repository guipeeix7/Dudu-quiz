import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { User } from "./../data/users";

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>([]);

  /**
   * Whenever the todos table has mutated, we need to fetch the data set again order to sync DB -> UI State
   */
  const fetchUsers = (tx: SQLite.SQLTransaction) => {
    tx.executeSql("SELECT * FROM users;", [], (_, { rows: { _array } }) =>
      setUsers(_array)
    );
  };

  const getUsers = (db: SQLite.Database) => {
    db.readTransaction(fetchUsers);
  };

  const addUser = (db: SQLite.Database, name: string, email : string, phone:string) => {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO users (name, email, phone) VALUES (?, ?, ?);", [name, email, phone]);

      fetchUsers(tx);
    });
  };

  const updateUserByEmail = (db: SQLite.Database, name:string, email:string, phone:string) => {
    db.transaction((tx) => {
        tx.executeSql(
          'UPDATE users SET name = ?, phone = ? WHERE email = ? ;',
          [name, phone, email]
        );      
        fetchUsers(tx);
    });
  };

  const checkUserExistsByEmail = (db: SQLite.Database, email:string) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users WHERE email = ?;',
          [email],
          (_, { rows: { _array } }) => {
            resolve(_array.length > 0 ? 1 : 0);
          }
        );
      });
    });
  };

  const getUserIdByEmail = async (db: SQLite.Database, email:string) => {
    db.readTransaction( (tx) =>
        tx.executeSql("SELECT * FROM users WHERE email = email;", [], (_, {rows: {_array}}) =>{
                setUser(_array[0])
            }
        )        
    );
  };

  const deleteUser = (db: SQLite.Database, id: number) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM users WHERE userId = ?;", [id]);

      fetchUsers(tx);
    });
  };

  return {
    users,
    getUsers,
    addUser,
    user,
    checkUserExistsByEmail,
    updateUserByEmail,
    getUserIdByEmail,
    // updateUser,
    deleteUser,
  };
}
