import React, { useContext, useState } from "react";
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
export const signup = ({ navigation }) => {
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const { register } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>GET A NEW ACCOUNT</Text>
      <FormInput
        placeholder="Your Email"
        keyboardType="email-address"
        onChangeText={(val) => setNewEmail(val)}
      />
      <FormInput
        placeholder="Password"
        keyboardType="visible-password"
        onChangeText={(val) => setNewPass(val)}
      />
      <FormInput
        placeholder="Confirm password"
        keyboardType="visible-password"
        onChangeText={(val) => setConfirm(val)}
      />

      <FormButton
        buttonTitle="FINISH"
        onPress={() => {
          if (confirm === newPass) {
            register(newEmail, newPass);
          } else {
            Alert.alert("Password does not match");
          }
        }}
      ></FormButton>
      <TouchableOpacity
        // style={styles.navButton}
        style={styles.bottomText}
        onPress={() => navigation.navigate("login")}
      >
        <Text>Back to Login!</Text>
      </TouchableOpacity>
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
