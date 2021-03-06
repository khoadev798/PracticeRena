import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Modal,
  TextInput,
  ToastAndroid,
  YellowBox,
} from "react-native";

import firebase from "../firebase/firebase.js";
import * as ImagePicker from "expo-image-picker";
import Swipeout from "react-native-swipeout";

export const Player = () => {
  const itemsRef = firebase.database().ref().child("players");
  const [lists, setLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  _hideDialog = () => {
    setModalVisible(false);
  };
  _showDialog = () => {
    setModalVisible(true);
  };
  _setCurrent = async (item) => {
    await setCurrentItem(item);
  };

  // Function add Product vao lists
  const listenForItems = (itemsRef) => {
    itemsRef.on("value", (snap) => {
      var items = [];
      snap.forEach((child) => {
        let item = {
          key: child.key,
          name: child.val().name,
          team: child.val().team,
          height: child.val().height,
          image: child.val().image,
        };
        items.push(item);
      });
      setLists(items);
    });
  };

  useEffect(() => {
    listenForItems(itemsRef);
    //Tat warning khong can thiet
    YellowBox.ignoreWarnings(["Setting a timer", "Warning:"]);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        renderItem={({ item }) => (
          <PlayerItem
            item={item}
            _showDialog={_showDialog}
            _setCurrent={_setCurrent}
          />
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          _setCurrent(null);
          _showDialog();
        }}
      >
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <PlayerInsUp item={currentItem} _hideDialog={_hideDialog} />
      </Modal>
    </View>
  );
};
//Insert Update Product function
const PlayerInsUp = (props) => {
  const [item] = useState(props.item);
  const [isInsert] = useState(item == null);
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [height, setHeight] = useState("");
  const [image, setImage] = useState("https://reactjs.org/logo-og.png");

  //function chọn ảnh
  const _chooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(image);
    }
  };
  //function up ảnh fireStorage
  const _uploadImage = async (uri) => {
    const path = "images/" + name + ".jpg";

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebaseConfig.storage().ref(path).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  //function Insert Product
  const insertPlayer = async () => {
    const remoteUri = await _uploadImage(image);

    firebaseConfig
      .database()
      .ref()
      .child("players")
      .push({
        name: name,
        team: team,
        height: height,
        image: remoteUri,
      })
      .then(() => {
        console.log("Insert success!");
        ToastAndroid.show("Insert success!", ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show("Insert fail!", ToastAndroid.SHORT);
      });
  };
  //function Update Product
  const updatePlayer = async () => {
    const remoteUri = await _uploadImage(image);
    firebaseConfig
      .database()
      .ref()
      .child("players")
      .child(key)
      .set({
        name: name,
        team: team,
        height: height,
        image: remoteUri,
      })
      .then(() => {
        console.log("Update success!");
        ToastAndroid.show("Update success!", ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show("Update fail!", ToastAndroid.SHORT);
      });
  };
  //fuction useEffect
  useEffect(() => {
    if (!isInsert) {
      setKey(props.item.key);
      setName(props.item.name);
      setTeam(props.item.team);
      setHeight(props.item.height);
      setImage(props.item.image);
    }
  }, []);

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>
          {isInsert ? "Insert" : "Update"} Player
        </Text>
        <TouchableWithoutFeedback onPress={() => _chooseImage()}>
          <Image
            source={{ uri: image, width: 150, height: 150 }}
            style={{ borderWidth: 1, borderColor: "black" }}
          />
        </TouchableWithoutFeedback>
        <View style={styles.lineDialog}>
          <Text style={styles.textDialog}>Name: </Text>
          <TextInput
            style={styles.textInputDialog}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.lineDialog}>
          <Text style={styles.textDialog}>Team: </Text>
          <TextInput
            style={styles.textInputDialog}
            value={team}
            onChangeText={(text) => setTeam(text)}
          />
        </View>

        <View style={styles.lineDialog}>
          <Text style={styles.textDialog}>Height: </Text>
          <TextInput
            style={styles.textInputDialog}
            value={height}
            onChangeText={(text) => setHeight(text + "cm")}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            margin: 2,
            alignItems: "center",
            width: (width * 80) / 187.5,
            padding: (width * 8) / 187.5,
          }}
        >
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              props._hideDialog();
            }}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              props._hideDialog();
              isInsert ? insertPlayer() : updatePlayer();
            }}
          >
            <Text style={styles.textStyle}>
              {isInsert ? "Insert" : "Update"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
//Item FlatList & Delete function
const PlayerItem = (props) => {
  const swipeoutSettings = {
    autoClose: true,
    onClose: () => {},
    onOpen: () => {
      props._setCurrent(props.item);
    },
    right: [
      {
        text: "Update",
        type: "secondary",
        onPress: () => {
          props._showDialog();
        },
      },
      {
        text: "Delete",
        type: "delete",
        onPress: () => {
          Alert.alert(
            "Delete",
            "Are you want to delete product " + props.item.name + "?",
            [
              {
                text: "No",
                onPress: () => console.log("Cancel Delete "),
                type: "cancel",
              },
              { text: "Yes", onPress: () => deletePlayer(props.item.key) },
            ],
            { cancelable: true }
          );
        },
      },
    ],
  };
  //Function Xoa Product
  const deletePlayer = (key) => {
    firebaseConfig.database().ref().child("players").child(key).remove();
  };

  return (
    <Swipeout {...swipeoutSettings}>
      <View style={styles.listContainer}>
        <Image
          source={{ uri: props.item.image, width: 60, height: 60 }}
          style={{ borderWidth: 1, borderColor: "black" }}
        />
        <View>
          <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold" }}>
            Name: {props.item.name}
          </Text>
          <Text style={{ marginLeft: 10 }}>Team: {props.item.team}</Text>
          <Text style={{ marginLeft: 10 }}>Height: {props.item.height}</Text>
        </View>
      </View>
    </Swipeout>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  listContainer: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    margin: (width * 3.6) / 187.5,
    padding: (width * 3.6) / 187.5,
    borderRadius: (width * 3.6) / 187.5,
  },
  fab: {
    height: 50,
    width: 50,
    borderRadius: 200,
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#686cc3",
  },
  text: {
    fontSize: 30,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: (width * 167.5) / 187.5,
    padding: (width * 8) / 187.5,
    borderRadius: (width * 3.6) / 187.5,

    margin: 20,
    backgroundColor: "white",

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    margin: 2,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  lineDialog: {
    width: "100%",
    height: 40,
    margin: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f1f1f1",
  },
  textInputDialog: {
    height: 34,
    flex: 1,
    marginRight: 4,
    borderWidth: 0.1,
    borderRadius: 5,
    color: "#111111",

    fontSize: 15,
    paddingLeft: 5,
  },
});
