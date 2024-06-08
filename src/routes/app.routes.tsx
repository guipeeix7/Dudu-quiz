import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Identify } from '../screens/Identify';
import { Home } from '../screens/Home';
import { Quiz } from '../screens/Quiz';
import { Finish } from '../screens/Finish';
import { History } from '../screens/History';
import { InitQuizz } from '../screens/InitQuiz';
import { GenerateWinner } from '../screens/GenerateWinner';

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      
      
      <Screen
        name="initQuizz"
        component={InitQuizz}
      />
      <Screen
        name="identify"
        component={Identify}
      />
      <Screen
        name="home"
        component={Home}
      />

      <Screen
        name="sortWinner"
        component={GenerateWinner}
      />
      <Group screenOptions={{ gestureEnabled: false }}>
        <Screen
          name="quiz"
          component={Quiz}
        />
        <Screen
          name="finish"
          component={Finish}
        />
      </Group>

      <Screen
        name="history"
        component={History}
      />
    </Navigator>
  )
}