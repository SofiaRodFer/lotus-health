import { useEffect, useState } from 'react'

import { FlatList, ScrollView, Text, View } from 'react-native';
import MealService from './src/database/MealService';

import DatabaseInit from './src/database/DatabaseInit';
import { ListMeals } from './src/helpers/ListMeals';
import { PopulateDatabase } from './src/utils/PopulateDatabase';

const db = new DatabaseInit()

export default function App() {
  const [list, setList] = useState([])

  async function test() {
    const mealService = new MealService()

    // await PopulateDatabase(50, 100, 500)

    const results = await mealService.List()
    const displayableResults = results._array

    const test = await ListMeals(mealService)

    // console.log(test)

    setList(test)
  }

  useEffect(() => {
    test()
  }, [])

  return (
    <View>

    </View >
  );
}
