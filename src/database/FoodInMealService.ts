import React from 'react';

import { FoodInMealModel } from '../models/FoodInMealModel';
import { DatabaseConnection } from './DatabaseInit';

const table = "FoodInMeal"
const db = DatabaseConnection.getConnection()

export default class FoodInMealService {
  Insert(param: FoodInMealModel) {
    return new Promise((resolve, reject) => db.transaction(
      tx => {
        tx.executeSql(`INSERT INTO ${table} (meal_id, food_id) 
                VALUES (?, ?)`,
          [param.meal_id, param.food_id],
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

  Update(param: FoodInMealModel) {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`UPDATE ${table} SET meal_id = ?, food_id = ?;`,
        [param.meal_id, param.food_id],
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