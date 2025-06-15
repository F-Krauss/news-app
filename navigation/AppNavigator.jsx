// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewsListScreen from '../screens/NewsListScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4682B4' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="NewsList" 
        component={NewsListScreen} 
        options={{ title: 'I search Newston' }}
      />
      <Stack.Screen 
        name="NewsDetail" 
        component={NewsDetailScreen} 
        options={{ title: 'Info.' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;