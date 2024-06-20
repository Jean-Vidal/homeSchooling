import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../pages/HomeScreen';
import MateriasScreen from '../pages/Materias';
import Signup from '../pages/Signin/Signup';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  
}

function AppRoutes() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="MateriasScreen" component={MateriasScreen} options={{headerShown: false}}/>

    </Stack.Navigator>
  );
}

export default AppRoutes;
