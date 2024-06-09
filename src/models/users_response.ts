import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { UserResponse } from "./../data/userResponse";

export function useUserResponse() {
  const [usersResponses, setusersResponses] = useState<UserResponse[]>([]);
  const [userResponseAlreadyExists, setUserResponseAlreadyExists] = useState<number>(0);
  const [userResponseHistory, setUsersResponseHistory] = useState<any>([]);
  const [currentUserResponseHistory, setCurrentUsersResponseHistory] = useState<any>([]);

  const fetchUsersResponse = (tx: SQLite.SQLTransaction) => {
    tx.executeSql("SELECT * FROM user_response;", [], (_, { rows: { _array } }) =>
      setusersResponses(_array)
    );
  };

  const getUsersResponse = (db: SQLite.Database) => {
    db.readTransaction(fetchUsersResponse);
  };

  const addUserResponse = (db: SQLite.Database, userId: number, questionId: number, isCorrect: number) => {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO user_response (userId, questionId, isCorrect) VALUES (?, ?, ?);", [userId, questionId, isCorrect]);
      fetchUsersResponse(tx);
    });
  };

  const updateResponse = (db: SQLite.Database, userId: number, questionId: number, isCorrect: number) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE user_response SET isCorrect = ? WHERE userId = ? AND questionId = ? ;',
        [isCorrect, userId, questionId]
      );
      fetchUsersResponse(tx);
    });
  };

  const checkUserResponseAlreadyExists = (db: SQLite.Database, userId: number, questionId: number) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user_response WHERE userId = ? AND questionId = ?;',
        [userId, questionId],

        (_, { rows: { _array } }) => {
          setUserResponseAlreadyExists(_array.length > 0 ? 1 : 0);
        }
      )
    });
  };


  const userResponseHistoryData = (db: SQLite.Database) => {

    db.transaction((tx) => {

      tx.executeSql(
        `SELECT users.*, COUNT(user_response.isCorrect) AS correctCount 
            FROM users
            LEFT JOIN user_response ON users.userId = user_response.userId
            AND user_response.isCorrect = 0
            GROUP BY users.userId;`,
        [],

        (_, { rows: { _array } }) => {
          console.log(_array)
          setUsersResponseHistory(_array)
        }
      )
    });
  };

  const responseHistoryDataByUserId = (db: SQLite.Database, userId: number) => {
    // return new Promise((resolve, reject) => db.transaction(tx => {
    //   db.transaction((tx) => {

    //     tx.executeSql(
    //       `SELECT users.*, COUNT(user_response.isCorrect) AS correctCount 
    //             FROM users
    //             LEFT JOIN user_response ON users.userId = user_response.userId
    //             AND user_response.userId = ?
    //             GROUP BY users.userId;`,
    //       [userId],

    //       (_, { rows: { _array } }) => {
    //         console.log("AAAAAAAAAAAAAAAAA", _array)

    //         setCurrentUsersResponseHistory(_array)
    //       }
    //     )
    //   });
    // }))
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`SELECT users.*, COUNT(user_response.isCorrect ) AS correctCount 
      FROM users
      LEFT JOIN user_response ON users.userId = user_response.userId
      where users.userId = ?
      AND user_response.isCorrect = 1 
      GROUP BY users.userId;`, [userId], (_, { rows: {_array} }) => {
          resolve(_array[0])
      }), (sqlError:any) => {
          console.log(sqlError);
      }}, (txError) => {
      console.log(txError);
    }))

  };

  const clearUsersQuestions = (db: SQLite.Database, userId:number) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM user_response WHERE userId = ?;',
        [userId]
      );
      console.log('executed')
    });
  };



  const deleteUserResponse = (db: SQLite.Database, id: number) => {
    db.transaction((tx) => {
      tx.executeSql("PRAGMA table_info(table_name);");

      fetchUsersResponse(tx);
    });
  };

  return {
    usersResponses,
    getUsersResponse,
    addUserResponse,
    checkUserResponseAlreadyExists,
    userResponseAlreadyExists,
    updateResponse,
    userResponseHistory,

    deleteUserResponse,
    userResponseHistoryData,
    responseHistoryDataByUserId,
    currentUserResponseHistory,
    clearUsersQuestions
  };
}
