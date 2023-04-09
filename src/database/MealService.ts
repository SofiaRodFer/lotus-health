import React from 'react';

import { MealModel } from '../models/MealModel';
import { DatabaseConnection } from './DatabaseInit';

const table = "Meals"
const db = DatabaseConnection.getConnection()

export default class MealService {
  Insert(param: MealModel) {
    return new Promise((resolve, reject) => db.transaction(
      tx => {
        tx.executeSql(`INSERT INTO ${table} (type, date_meal, avg_health_score) 
                VALUES (?, ?, ?)`,
          [param.type, param.date_meal, param.avg_health_score],
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

  Update(param: MealModel) {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`UPDATE ${table} SET type = ?, date_meal = ?, avg_health_score = ?;`,
        [param.type, param.date_meal, param.avg_health_score],
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

  FindById(id: number) {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`SELECT meal_id, food_id, type AS meal_type, avg_health_score, date_meal, name AS food_name, health_score FROM FoodInMeal INNER JOIN Meals ON Meals.id = FoodInMeal.meal_id INNER JOIN Foods ON Foods.id = FoodInMeal.food_id WHERE meal_id = ${id};`, [id], (_, { rows }) => {
        resolve(rows)
      }), (sqlError) => {
        console.log(sqlError);
      }
    }, (txError) => {
      console.log(txError);

    }));
  }

  List() {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`SELECT meal_id, food_id, type AS meal_type, avg_health_score, date_meal, name AS food_name, health_score FROM FoodInMeal INNER JOIN Meals ON Meals.id = FoodInMeal.meal_id INNER JOIN Foods ON Foods.id = FoodInMeal.food_id;`, [], (_, { rows }) => {
        resolve(rows)
      }), (sqlError) => {
        console.log(sqlError);
      }
    }, (txError) => {
      console.log(txError);
    }))
  }
}