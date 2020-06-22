import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
const Social = require("../modules/Social");

console.disableYellowBox = true;

export default function SocialLoginArea() {
  const imageGuest =
    "https://firebasestorage.googleapis.com/v0/b/demolt15101.appspot.com/o/images%2Favatar.jpg?alt=media&token=d7261c3c-b680-4d51-b300-5e8f6f94fb6f";
  const [isFaceBook, setIsFaceBook] = useState(false);
  const [isGoogle, setIsGoogle] = useState(false);
  const [userData, setUserData] = useState({
    name: "Guest",
    image: imageGuest,
  });
  const [isImageLoading, setImageLoadStatus] = useState(false);
  function getUserData() {
    return { userData };
  }
  facebookLogIn = async () => {
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
          const user = {
            name: data.name,
            image: data.picture.data.url,
          };
          setUserData(user);
        })
        .catch((e) => console.log(e));
    }
  };
  facebookLogOut = () => {
    setIsFaceBook(false);
    setUserData({
      name: "Guest",
      image: imageGuest,
    });
    setImageLoadStatus(false);
  };

  googleLogIn = async () => {
    const data = await Social.loginGoogle(
      "541438332950-g34g79l8vmstdohq5bkfof0bhd20obl5.apps.googleusercontent.com"
    );
    if (data !== null) {
      setIsGoogle(true);
      const user = {
        name: data.displayName,
        image: data.photoURL,
      };
      setUserData(user);
    }
  };

  googleLogOut = () => {
    Social.logoutGoogle();

    setIsGoogle(false);
    setUserData({
      name: "Guest",
      image: imageGuest,
    });
    setImageLoadStatus(false);
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200, borderRadius: 50 }}
        source={{ uri: userData.image }}
        onLoadEnd={() => setImageLoadStatus(true)}
      />
      <ActivityIndicator
        size="large"
        color="#0000ff"
        animating={!isImageLoading}
        style={{ position: "absolute" }}
      />
      <Text style={{ fontSize: 22, marginVertical: 10 }}>
        Hi {userData.name}!
      </Text>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => (isFaceBook ? facebookLogOut() : facebookLogIn())}
      >
        <Text style={{ color: "#fff" }}>
          {isFaceBook ? "Logout Facebook" : "Login with Facebook"}{" "}
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => (isGoogle ? googleLogOut() : googleLogIn())}
      >
        <Text style={{ color: "#fff" }}>
          {isGoogle ? "Logout Google" : "Login with Google"}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ebee",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn: {
    marginTop: 20,
    backgroundColor: "#4267b2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#4267b2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
