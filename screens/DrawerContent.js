import React from "react";
import { useContext } from "react";

import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../navigation/AuthProvider";
import { SocailLoginArea } from "../screens/SocialLoginGeneral";
// npm i --save react-native-paper => paper for icons
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
export function DrawerContent(props) {
  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const imageURL = user.imageURL;
  const name = user.username;
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: imageURL,
                }}
                size={50}
              />
              <View style={{ marginLeft: 5, flexDirection: "column" }}>
                <Title style={styles.title}>{name}</Title>
                <Caption style={styles.caption}>@User</Caption>
              </View>
            </View>
            {/* Credit */}
            <View style={styles.row}>
              <View style={styles.section}>
                <Caption>Current credit: </Caption>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  $100
                </Paragraph>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Home"
              icon={({ size, color }) => {
                return <Icon name="home" size={size} color={color} />;
              }}
              onPress={() => {
                // logout();
                //Navigate to home
                props.navigation.navigate("HomeScreen");
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Products"
              icon={({ size, color }) => {
                return <Icon name="ruby" size={size} color={color} />;
              }}
              onPress={() => {
                // logout();
                //Navigate to products
                props.navigation.navigate("Products");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Sign out"
          icon={({ size, color }) => {
            return <Icon name="exit-to-app" size={size} color={color} />;
          }}
          onPress={() => {
            logout();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
