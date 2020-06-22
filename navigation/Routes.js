import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthProvider";
import { AsyncStorage, ActivityIndicator } from "react-native";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";

export const Routes = () => {
  const { login, facebookLogin, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((user) => {
        if (user) {
          login();
          facebookLogin();
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ justifyContent: "center" }}
      ></ActivityIndicator>
    );
  }
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
