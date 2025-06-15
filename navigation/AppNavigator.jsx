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







// const AppNavigator = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: '#a2d18b', marginButtom: 10},
//         headerTintColor: '#fff',
//         headerTitleStyle: { fontWeight: 'bold', fontSize: 30},
//         headerTitleAlign: 'center'
        
//       }}
//     >
//       <Stack.Screen 
//         name="NewsList" 
//         component={NewsListScreen} 
//         options={{ title: 'Isearch Newston' }}
//       />
//       {/* <Stack.Screen 
//         name="NewsDetail" 
//         component={NewsDetailScreen} 
//         options={{ title: 'Info.' }}
//       /> */}
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;