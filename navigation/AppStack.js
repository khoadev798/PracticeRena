import * as React from "react";
import { useContext, useState, useRef } from "react";
// import { Button, View } from "react-native";
import { StyleSheet, View, Button, Text, SafeAreaView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "../navigation/AuthProvider";
import { DrawerContent } from "../screens/DrawerContent";
import { Player } from "../screens/Product_CRUD_UpImage";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

function HomeScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Lebron James's Highlights
        </Text>
        <YoutubePlayer
          ref={playerRef}
          height={300}
          width={400}
          videoId={"N1i3eHM24Jk"}
          play={false}
          onChangeState={(event) => console.log(event)}
          onReady={() => console.log("ready")}
          onError={(e) => console.log(e)}
          onPlaybackQualityChange={(q) => console.log(q)}
          volume={50}
          playbackRate={1}
          playerParams={{
            cc_lang_pref: "us",
            showClosedCaptions: true,
          }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Kyrie Irving's Highlights
        </Text>

        <YoutubePlayer
          ref={playerRef}
          height={300}
          width={400}
          videoId={"Yh8ZDDSQULw"}
          play={false}
          onChangeState={(event) => console.log(event)}
          onReady={() => console.log("ready")}
          onError={(e) => console.log(e)}
          onPlaybackQualityChange={(q) => console.log(q)}
          volume={50}
          playbackRate={1}
          playerParams={{
            cc_lang_pref: "us",
            showClosedCaptions: true,
          }}
        />

        <Button
          onPress={() => navigation.navigate("Players")}
          title="View your favorite NBA plyaers"
        />
      </ScrollView>
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
const PlayersStack = createStackNavigator();
const PasswordUpdateStack = createStackNavigator();
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
const PlayersStackScreen = ({ navigation }) => {
  return (
    <PlayersStack.Navigator
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
      <PlayersStack.Screen
        name="Players"
        component={Player}
        title="Player"
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
    </PlayersStack.Navigator>
  );
};
const PasswordUpdateStackScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");

  return (
    <PasswordUpdateStack.Navigator
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
      <PasswordUpdateStack.Screen></PasswordUpdateStack.Screen>
    </PasswordUpdateStack.Navigator>
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
      <Drawer.Screen name="Players" component={PlayersStackScreen} />
    </Drawer.Navigator>
    // </NavigationContainer>
  );
};
