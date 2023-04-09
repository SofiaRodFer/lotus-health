import MealService from "../database/MealService";

export async function ListMealById(service: MealService, mealId: number) {
  const rawMeal = await service.FindById(mealId)
  const mealArray = rawMeal._array

  const newMeal = {
    id: mealArray[0].meal_id,
    type: mealArray[0].meal_type,
    date_meal: mealArray[0].date_meal,
    foods: mealArray.map(food => {
      return {
        food_id: food.food_id,
        food_name: food.food_name,
        health_score: food.health_score
      }
    }),
    avg_health_score: mealArray[0].avg_health_score
  }

  return newMeal
}