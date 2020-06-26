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
import Icon from "react-native-vector-icons/FontAwesome5";

export const login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { login, facebookLogin } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>WELCOME</Text>

      {/* <Text style={styles.title}>NBA FANS</Text> */}
      <FormInput
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(val) => setEmail(val)}
        autoCapitalize="none"
      />
      <FormInput
        placeholder="Password"
        onChangeText={(val) => setPass(val)}
        secureTextEntry={true}
      />

      <FormButton buttonTitle="Login" onPress={() => login(email, pass)} />

      <TouchableOpacity onPress={() => facebookLogin()}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            padding: 5,
            backgroundColor: "#3B5998",
            borderRadius: 5,
          }}
        >
          <Icon
            name="facebook"
            size={25}
            color="#fff"
            style={{ height: 25, width: 25 }}
          />
          <Text
            style={{
              color: "#fff",
              paddingLeft: 5,
              fontSize: 20,
            }}
          >
            Countinue with Facebook
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomText}
        onPress={() => {
          //Go to register screen
          //Navigate...

          navigation.navigate("signup", { isForRegister1: true });
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
