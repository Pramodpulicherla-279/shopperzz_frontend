import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
// import Icon from 'react-native-vector-icons/Feather';

// Import your screens
import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ProductList from '../screens/ProductList/ProductList';
import CartScreen from '../screens/CartScreen/CartScreen';
import ProductOverview from '../screens/ProductOverview/ProductOverview';
import { colors } from '../constants/colors';

const Stack = createNativeStackNavigator();

// Stack for users who are NOT logged in
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    {/* You can add a SignUpScreen here as well */}
  </Stack.Navigator>
);

// Stack for users who ARE logged in
const MainStack = () => (
  <Stack.Navigator>
    {/* <Stack.Screen name="MainTabs" component={MainTabs} /> */}
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, animation: 'none' }}/>
    <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false, animation: 'none' }}/>
    <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false, animation: 'none' }}/>
    <Stack.Screen name="ProductOverview" component={ProductOverview} options={{ headerShown: false, animation: 'none' }}/>
  </Stack.Navigator>
);

const AppNavigator = () => {
  // Use 'isAuthenticated' for a clearer check, based on our authSlice setup
  const { isAuthenticated } = useSelector(state => state.auth);

  // Conditionally render the correct navigator stack.
  // This is the recommended pattern for auth flows.
  return isAuthenticated ? <MainStack /> : <AuthStack />;
};

export default AppNavigator;
