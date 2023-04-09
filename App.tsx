import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins'
import { ThemeProvider } from 'styled-components'

import DatabaseInit from './src/database/DatabaseInit';

import { Home } from './src/screens/Home';
import theme from './src/global/theme';

const db = new DatabaseInit()

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}
