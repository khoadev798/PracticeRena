import React, { useState, createContext } from "react";
import firebaseConfig from "../firebase/firebase";
import { Alert } from "react-native";
// import Toast from "react-native-simple-toast";
// import { ToastAndroid } from "react-native";
const Social = require("../modules/Social");

export const AuthContext = createContext({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  facebookLogin: () => {},
  facebookLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const imageGuest =
    "https://firebasestorage.googleapis.com/v0/b/demolt15101.appspot.com/o/images%2Favatar.jpg?alt=media&token=d7261c3c-b680-4d51-b300-5e8f6f94fb6f";
  const [user, setUser] = useState(null);
  const [isFaceBook, setIsFaceBook] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        user,
        facebookLogin: async () => {
          const token = await Social.loginFacebook("713064715892202");
          // const token = "259114542010823|OH_XjkVls4fMMqIY9xt_6XXzidI";
          if (token !== null) {
            // Get the user's name using Facebook's Graph API
            fetch(
              `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
            )
              .then((response) => response.json())
              .then((data) => {
                setIsFaceBook(true);

                setUser({
                  username: data.name,
                  imageURL: data.picture.data.url,
                  isFacebookUser: true,
                }); // setUser({ imageURL: imgURL });
              })
              .catch((e) => console.log(e));
          }
        },
        facebookLogout: async () => {
          setIsFaceBook(false);
          setUser({
            name: "Guest",
            image: imageGuest,
          });
        },
        login: async (email, password) => {
          await firebaseConfig
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
              setUser({
                username: email,
                imageURL:
                  "https://firebasestorage.googleapis.com/v0/b/practicerena.appspot.com/o/avatar.png?alt=media&token=d4749fd7-c33f-4d5b-b0bf-f93c389da961",
                isFacebookUser: false,
              });

              // ToastAndroid.show("Login Success", ToastAndroid.SHORT);
              // Toast.show("Login success", Toast.SHORT);
            })
            .catch((error) => {
              const { code, message } = error;
              console.log("Error: " + message);
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
