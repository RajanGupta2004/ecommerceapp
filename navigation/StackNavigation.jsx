import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../screen/RegisterScreen';
import HomeScreen from '../screen/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screen/ProfileScreen';
import ProductInfoScreen from '../screen/ProductInfoScreen';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  function MyBottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <Entypo name="home" size={30} color="black" />
              ) : (
                <AntDesign name="home" size={30} color="black" />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <Ionicons name="person" size={30} color="black" />
              ) : (
                <Ionicons name="person-outline" size={30} color="black" />
              );
            },
          }}
        />
        <Tab.Screen
          name="Cart"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <Ionicons name="cart-sharp" size={30} color="black" />
              ) : (
                <Ionicons name="cart-outline" size={30} color="black" />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MyBottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
