import React, { useContext, useState } from "react";
import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
// import SocialLoginArea from "../screens/SocialLoginGeneral";
// import FacebookButton from "../components/FacebookLoginButton";

// import { TextInput } from "react-native-gesture-handler";
const appLogin = (navigation, email, pass) => {
  if (email == "admin" && pass == "123") {
    Alert.alert("Nice");
    navigation.navigate("Notifications");
    // return true;
  } else {
    Alert.alert("Oops!");
    // return false;
  }
};
export const login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { login, facebookLogin } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>WELCOME</Text>
      <FormInput
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(val) => setEmail(val)}
        autoCapitalize="none"
      />
      <FormInput
        placeholder="Password"
        keyboardType="visible-password"
        onChangeText={(val) => setPass(val)}
        secureTextEntry={true}
      />
      {/* <TouchableOpacity
        onPress={() => {
          // appLogin(navigation, email, pass);
          login(email, pass);
        }}
      >
        <Text>LOGIN</Text>
      </TouchableOpacity> */}
      <FormButton buttonTitle="Login" onPress={() => login(email, pass)} />
      {/* <FacebookButton /> */}
      {/* <SocialLoginArea /> */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => facebookLogin()}
      >
        <Text style={{ color: "#000" }}>
          {/* {isFaceBook ? "Logout Facebook" : "Login with Facebook"}{" "}
           */}
          Login with Facebook
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomText}
        onPress={() => {
          //Go to register screen
          //Navigate...
          navigation.navigate("signup");
        }}
      >
        <Text>Sign up now!</Text>
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
