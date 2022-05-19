import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import axios from "axios";

import CustomInput from "../components/CustomInput";

export default function handleSubmit({ setToken, navigation }) {
  console.log(navigation.setParams.setToken);
  const [email, setEmail] = useState("seb1@lereacteur.io");
  const [username, setUsername] = useState("seb");
  const [description, setDescription] = useState("reactNative");
  const [password, setPassword] = useState("pass");
  const [confirmPassword, setConfirmPassword] = useState("pass");
  const [messageEmail, setMessageEmail] = useState("");
  const [messageUserName, setMessageUserName] = useState("");
  const [messageDescription, setMessageDescription] = useState("");
  const [messagePassword, setMessagePassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <KeyboardAwareScrollView>
          <View style={styles.screen}>
            <View style={styles.header}>
              <Image
                style={styles.coverImage}
                source={require("../assets/logoAirbnb.png")}
              ></Image>
              <Text>Sign Up</Text>
            </View>
            <View style={styles.viewInput}>
              <CustomInput
                placeholder="email"
                setState={setEmail}
                value={email}
              />
              <CustomInput
                placeholder="username"
                setState={setUsername}
                value={username}
              />
              <TextInput
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                }}
                multiline={true}
                style={styles.bigInput}
                placeholder="describe yourself in a few words ..."
              />
              {/* <Text>{description}</Text> */}
              <CustomInput
                placeholder="password"
                setState={setPassword}
                value={password}
                password={true}
              />
              <CustomInput
                placeholder="confirm password"
                setState={setConfirmPassword}
                value={confirmPassword}
                password
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text>Already have a account? Sign in</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

        <Text>
          {messagePassword} {messageEmail} {messageUserName}
          {messageDescription}
        </Text>
      </View>
    </View>
  );
}

// A Faire Créer un CustomInput en composant de façon a utiliser toujours le même objet pour tous les inputs.
const styles = StyleSheet.create({
  scrollView: {
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  screen: {
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  coverImage: {
    height: 150,
    width: 100,
    //marginRight: 20,
  },
  viewInput: {
    paddingHorizontal: 5,
  },
  input: {
    paddingTop: 20,
    paddingHorizontal: 10,
    borderColor: "red",
    borderBottomWidth: 2,
    margin: 15,
  },
  inputDescription: {
    height: 80,
    alignContent: "flex-start",
    paddingHorizontal: 10,
    borderColor: "red",
    borderWidth: 2,
    margin: 15,
  },
  button: {
    borderColor: "#F9585D",
    borderWidth: 3,
    marginTop: 30,
    width: "60%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
