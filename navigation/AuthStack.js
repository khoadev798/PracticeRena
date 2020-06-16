import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { login } from "../screens/login";
import { signup } from "../screens/signup";

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="login" headerMode="none">
      <Stack.Screen name="login" component={login}></Stack.Screen>
      <Stack.Screen name="signup" component={signup}></Stack.Screen>
    </Stack.Navigator>
  );
};
