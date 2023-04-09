import MealService from "../database/MealService";

export async function ListMeals(service: MealService) {
  const initialArray = await service.List()
  const resultsArray = initialArray._array

  let refactoredArray = []

  resultsArray.map((obj) => {
    const mealIndex = refactoredArray.length > 0 ? refactoredArray.findIndex(item => {
      return item.id === obj.meal_id;
    }) : 0


    if (mealIndex > 0 || (refactoredArray.length >= 1 && mealIndex === 0)) {
      refactoredArray[mealIndex] = {
        id: obj.meal_id,
        type: obj.meal_type,
        date_meal: obj.date_meal,
        foods: [
          ...refactoredArray[mealIndex].foods,
          {
            id: obj.food_id,
            name: obj.food_name,
            health_score: obj.health_score
          }
        ],
        avg_health_score: obj.avg_health_score
      }
    } else {
      refactoredArray = [...refactoredArray, {
        id: obj.meal_id,
        type: obj.meal_type,
        date_meal: obj.date_meal,
        foods: [
          {
            id: obj.food_id,
            name: obj.food_name,
            health_score: obj.health_score
          }
        ],
        avg_health_score: obj.avg_health_score
      }]
    }
  })

  return refactoredArray
}
