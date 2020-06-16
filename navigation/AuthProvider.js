import React, { useState, createContext } from "react";
import firebaseConfig from "../firebase/firebase";
import { Alert } from "react-native";
// import Toast from "react-native-simple-toast";
// import { ToastAndroid } from "react-native";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: async (email, password) => {
          await firebaseConfig
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
              setUser({ username: email });
              console.log("Login success!");
              // ToastAndroid.show("Login Success", ToastAndroid.SHORT);
              // Toast.show("Login success", Toast.SHORT);
            })
            .catch((error) => {
              const { code, message } = error;
              console.log("Error: " + message);
              // Toast.show("Error: " + message, 1);
              //   Alert.alert("Error: ", message);
              // ToastAndroid.show("Login fail!", ToastAndroid.SHORT);
            });
        },
        register: async (email, password) => {
          await firebaseConfig
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
              console.log("Register success!");
              // ToastAndroid.show("Register success!", ToastAndroid.SHORT);
              // Toast.show("Register success", 1);
            })
            .catch((error) => {
              const { code, message } = error;
              console.log("Error: " + message);
              // Toast.show("Error: " + message, 1);
              // ToastAndroid.show("Register fail!", ToastAndroid.SHORT);
            });
        },
        logout: async () => {
          setUser(null);
          // ToastAndroid.show("Logout!", ToastAndroid.SHORT);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
