import FoodInMealService from "../database/FoodInMealService"
import FoodService from "../database/FoodService"
import MealService from "../database/MealService"

import { FoodInMealModel } from "../models/FoodInMealModel"
import { FoodModel } from "../models/FoodModel"
import { MealModel } from "../models/MealModel"

export async function PopulateDatabase(meals: number, foods: number, relationships: number) {
  const mealService = new MealService()
  const foodService = new FoodService()
  const foodInMealService = new FoodInMealService()

  const getRandomNumber = (maxNumber: number) => {
    return Math.floor(Math.random() * maxNumber)
  }

  const mealDictionary = {
    0: 'breakfast',
    1: 'morning_snack',
    2: 'lunch',
    3: 'afternoon_snack',
    4: 'dinner',
    5: 'night_snack',
    6: 'extra'
  }

  for (let i = 0; i <= meals; i++) {
    const meal = {
      type: mealDictionary[getRandomNumber(6)],
      date_meal: String(new Date()),
      avg_health_score: getRandomNumber(100)
    } as MealModel

    await mealService.Insert(meal)
  }

  for (let i = 0; i <= foods; i++) {
    const food = {
      name: 'test',
      health_score: getRandomNumber(100)
    } as FoodModel

    await foodService.Insert(food)
  }

  for (let i = 0; i <= relationships; i++) {
    const relation = {
      food_id: getRandomNumber(foods),
      meal_id: getRandomNumber(meals)
    } as FoodInMealModel

    await foodInMealService.Insert(relation)
  }
}