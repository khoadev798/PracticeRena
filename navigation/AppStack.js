import * as React from "react";
import { useContext } from "react";

import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../navigation/AuthProvider";
import { login } from "../screens/login";

// import { login } from "../PracticeRena/screens/login";
function HomeScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
      <Button
        onPress={() => {
          logout();
        }}
        title="Log out"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export const AppStack = () => {
  // const { logout } = useContext(AuthContext);

  return (
    // <NavigationContainer>
    <Drawer.Navigator initialRouteName="Login">
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
    // </NavigationContainer>
  );
};
