import React, { useContext, useState } from "react";
import * as firebase from "firebase";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
// import Toast from "react-native-simple-toast";
import { AuthContext } from "../navigation/AuthProvider";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";

// import { TextInput } from "react-native-gesture-handler";

// const register = (email, pass, confirm) => {};
export const updateaccount = ({ navigation }) => {
  //   const [currentUser, setCurrentUser] = useState(null);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const { logout } = useContext(AuthContext);
  var user = firebase.auth().currentUser;
  // setCurrentUser(user);
  var email = user.email;
  const reauthenticateUser = () => {
    var cred = firebase.auth.EmailAuthProvider.credential(email, oldPass);

    user
      .reauthenticateWithCredential(cred)
      .then(function () {
        console.log("ok");
        if (newPass === confirm) {
          user
            .updatePassword(newPass)
            .then(function () {
              // Update successful.
              Alert.alert("Password Updated!", "User logout automatically.");
              logout();
            })
            .catch(function (error) {
              // An error happened.
            });
        }
      })
      .catch(function (error) {
        console.log("not ok");
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>UPDATE YOUR ACCOUNT</Text>
      <FormInput
        editable={false}
        placeholder={email}
        keyboardType="email-address"
      />
      <FormInput
        placeholder="Current password"
        keyboardType="password"
        onChangeText={(val) => setOldPass(val)}
      />
      <FormInput
        placeholder="New password"
        keyboardType="password"
        onChangeText={(val) => setNewPass(val)}
      />
      <FormInput
        placeholder="Confirm password"
        keyboardType="password"
        onChangeText={(val) => setConfirm(val)}
      />

      <FormButton
        buttonTitle="UPDATE"
        onPress={() => {
          reauthenticateUser();
        }}
      ></FormButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
  bottomText: {
    marginTop: 10,
  },
});
