export type MealModel = {
  id?: string;
  type: 'breakfast' | 'morning_snack' | 'lunch' | 'afternoon_snack' | 'dinner' | 'night_snack' | 'extra';
  date_meal: string;
  avg_health_score: number;
}
