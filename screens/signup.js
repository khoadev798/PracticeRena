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
export const signup = ({ route, navigation }) => {
  const { isForRegister1 } = route.params;
  // const { isForRegister2 } = navigation.state.params;
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const { register, isForSignUp } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {/* GET A NEW ACCOUNT */}
        {isForRegister1 ? "GET A NEW ACCOUNT" : "UPDATE YOUR ACCOUNT"}
      </Text>
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
        buttonTitle={isForRegister1 ? "FINISH" : "UPDATE"}
        onPress={() => {
          if (confirm === newPass && isForRegister1) {
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
        <Text>{isForRegister1 ? "Back to login" : ""}</Text>
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
