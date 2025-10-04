import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
// import { RootState } from '../store/store'; // Remove this line if using JavaScript

import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ProductList from '../screens/ProductList/ProductList'
import CartScreen from '../screens/CartScreen/CartScreen'

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken } = useSelector(state => state.auth);

  return (
    <Stack.Navigator>
      {userToken ? (
        <>
        {/* Screens for authenticated users */}
          <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false }}
          />
          <Stack.Screen 
              name="ProductList" 
              component={ProductList} 
              options={{ title: 'Products' }} // You can customize the header
          />
             <Stack.Screen 
              name="CartScreen" 
              component={CartScreen} 
              options={{ title: 'Cart' }} // You can customize the header
          />
        </>
      ) : (
        // Screens for unauthenticated users
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Hides the header bar
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
