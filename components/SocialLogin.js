import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import * as GoogleSignIn from "expo-google-sign-in";
import * as AppAuth from "expo-app-auth";
module.exports.loginFacebook = async (appId) => {
  await Facebook.initializeAsync(appId);
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync(appId, {
      permissions: ["public_profile"],
    });
    if (type === "success") {
      console.log("Login success");
      //login with firebase
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL); // Set persistent auth state
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const facebookProfileData = await firebase
        .auth()
        .signInWithCredential(credential); // Sign in with Facebook credential
      return token;
    } else {
      console.log("Cancel");
    }
  } catch ({ message }) {
    console.log(`error: ${message}`);
  }
  return null;
};
module.exports.loginGoogle = async (ClientId) => {
  // When configured correctly, URLSchemes should contain your REVERSED_CLIENT_ID for build
  const { URLSchemes } = AppAuth;
  await GoogleSignIn.initAsync({
    scopes: ["profile", "email"],

    // You may ommit the oauth_client:clientId when the firebase `googleServicesFile` is configured
    clientId: ClientId,
  });
  await GoogleSignIn.signInSilentlyAsync();
  try {
    await GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = await GoogleSignIn.signInAsync();

    if (type === "success") {
      await GoogleSignIn.signInSilentlyAsync();

      //login firebase

      // Create a Google credential with the token
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(
        user.auth.idToken
      );

      // Sign-in the user with the credential
      firebase
        .auth()
        .signInWithCredential(googleCredential)
        .then(function (result) {
          console.log("Firebase sign in success");
        })
        .catch(function (error) {
          console.error("Error with Firebase sign in ", error.message); //error here
        });

      return user;
    }
  } catch ({ message }) {
    console.error("login: Error:" + message);
  }

  return null;
};

module.exports.logoutGoogle = async () => {
  await GoogleSignIn.signOutAsync();
};
