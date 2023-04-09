import React from 'react';

import { FoodModel } from '../models/FoodModel';
import { DatabaseConnection } from './DatabaseInit';

const table = "Foods"
const db = DatabaseConnection.getConnection()

export default class FoodService {
  Insert(param: FoodModel) {
    return new Promise((resolve, reject) => db.transaction(
      tx => {
        tx.executeSql(`INSERT INTO ${table} (name, health_score) 
                VALUES (?, ?)`,
          [param.name, param.health_score],
          (_, { insertId, rows }) => {
            console.log("id insert: " + insertId);
            resolve(insertId)
          }), (sqlError) => {
            console.log(sqlError);
          }
      }, (txError) => {
        console.log(txError);
      }));
  }

  Delete(id: number) {
    db.transaction(
      tx => {
        tx.executeSql(`DELETE FROM ${table} WHERE id = ?;`, [id], (_, { rows }) => {
        }), (sqlError) => {
          console.log(sqlError);
        }
      }, (txError) => {
        console.log(txError);

      });
  }

  Update(param: FoodModel) {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`UPDATE ${table} SET name = ?, health_score = ?;`,
        [param.name, param.health_score],
        (_, { rows }) => {
          resolve(rows)
        }),
        (sqlError) => {
          console.log(sqlError);
        }
    },
      (txError) => {
        console.log(txError);
      }
    ));
  }

  List() {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`SELECT * FROM ${table};`, [], (_, { rows }) => {
        resolve(rows)
      }), (sqlError) => {
        console.log(sqlError);
      }
    }, (txError) => {
      console.log(txError);
    }))
  }
}