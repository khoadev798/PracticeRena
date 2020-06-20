import * as React from "react";
import { useContext } from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "../navigation/AuthProvider";
import { DrawerContent } from "../screens/DrawerContent";
import { Product } from "../screens/Product_CRUD_UpImage";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function HomeScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Products")}
        title="View available products"
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
const HomeStack = createStackNavigator();
const ProductsStack = createStackNavigator();
const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6495ed",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        title="Home"
        options={{
          headerLeft: () => {
            return (
              <Icon.Button
                name="menu"
                size={25}
                backgroundColor="#6495ed"
                onPress={() => {
                  navigation.openDrawer();
                }}
              ></Icon.Button>
            );
          },
        }}
      />
      {/* <Stack.Screen name="Products" component={Product} title="Product" /> */}
    </HomeStack.Navigator>
  );
};
const ProductStackScreen = ({ navigation }) => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6495ed",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} title="Home" /> */}
      <ProductsStack.Screen
        name="Products"
        component={Product}
        title="Product"
        options={{
          headerLeft: () => {
            return (
              <Icon.Button
                name="menu"
                size={25}
                backgroundColor="#6495ed"
                onPress={() => {
                  navigation.openDrawer();
                }}
              ></Icon.Button>
            );
          },
        }}
      />
    </ProductsStack.Navigator>
  );
};

export const AppStack = () => {
  // const { logout } = useContext(AuthContext);

  return (
    // <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeScreen" component={HomeStackScreen} />
      <Drawer.Screen name="Products" component={ProductStackScreen} />
    </Drawer.Navigator>
    // </NavigationContainer>
  );
};
