import { createStackNavigator } from '@react-navigation/stack';
import NewsListScreen from '../screens/NewsListScreen';
// import NewsDetailScreen from '../screens/NewsDetailScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Isearch Newston"
        component={NewsListScreen} 
        options={{
          headerTitleAlign: 'center',
          headerStyle: { 
            backgroundColor: '#a2d4ab', 
            height: 110, 
          },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
        }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;