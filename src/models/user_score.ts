import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { UserResponse } from "./../data/userResponse";

export function useUserScore() {
  const [usersResponses, setusersResponses] = useState<UserResponse[]>([]);
  const [userResponseAlreadyExists, setUserResponseAlreadyExists] = useState<number>(0);
  const [userResponseHistory, getUserResponseHistory] = useState<[]>([]);
//   id: new Date().getTime().toString(),
//   userId: userId,
//   title: quiz.title,
//   level: quiz.level,
//   points,
//   questions: quiz.questions.length
  const fetchUsersResponse = (tx: SQLite.SQLTransaction) => {
    tx.executeSql("SELECT * FROM user_response;", [], (_, { rows: { _array } }) =>
      setusersResponses(_array)
    );
  };

  const getUsersResponse = (db: SQLite.Database) => {
    db.readTransaction(fetchUsersResponse);
  };

  const addUserResponse = (db: SQLite.Database, userId: number, questionId : number, isCorrect:number) => {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO user_response (userId, questionId, isCorrect) VALUES (?, ?, ?);", [userId, questionId, isCorrect]);
      fetchUsersResponse(tx);
    });
  };
  
  const updateResponse = (db: SQLite.Database, userId:number, questionId:number, isCorrect:number) => {
    db.transaction((tx) => {
        tx.executeSql(
          'UPDATE user_response SET isCorrect = ? WHERE userId = ? AND questionId = ? ;',
          [isCorrect, userId, questionId]
        );      
        fetchUsersResponse(tx);
    });
  };

  const checkUserResponseAlreadyExists = (db: SQLite.Database, userId:number, questionId:number) => {
    db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM user_response WHERE userId = ? AND questionId = ?;',
          [userId,questionId],
          
          (_, { rows: { _array } }) => {
            setUserResponseAlreadyExists(_array.length > 0 ? 1 : 0);
          }
        )
      });
  };
  

  const userResponseHistoryData = (db: SQLite.Database) => {
    db.transaction((tx) => {
        tx.executeSql(
          `SELECT users.userId, SUM(user_response.isCorrect) AS points 
            FROM users
            LEFT JOIN user_response ON users.userId = user_response.userId
            WHERE user_response.isCorrect = 1
            GROUP BY users.userId;`,
          [],
          
          (_, { rows: { _array } }) => {
          }
        )
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
    deleteUserResponse,
    userResponseHistoryData
  };
}
