import { Button, Text, TextInput, View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import axios from "axios";

import CustomInput from "../components/CustomInput";

export default function SignUpScreen({ setToken }) {
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
      <View>
        <KeyboardAwareScrollView>
          <View>
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
        </KeyboardAwareScrollView>

        <Text>
          {messagePassword} {messageEmail} {messageUserName}{" "}
          {messageDescription}
        </Text>

        <Button
          title="Sign up"
          onPress={async () => {
            setMessagePassword("");
            setMessageEmail("");
            setMessageUserName("");
            setMessageDescription("");
            setMessagePassword("");
            setMessagePassword("");

            let validForm = true;
            if (confirmPassword !== password) {
              setMessagePassword("passwords doesn't match ");
              validForm = false;
            }
            if (!email) {
              setMessageEmail("Missing eMail ");
              validForm = false;
            }
            if (!username) {
              setMessageUserName("Missing username ");
              validForm = false;
            }
            if (!description) {
              setMessageDescription("Missing description ");
              validForm = false;
            }
            if (!password) {
              setMessagePassword("Missing password ");
              validForm = false;
            }
            if (!confirmPassword) {
              setMessagePassword("Missing password confirmation ");
              validForm = false;
            }
            if (validForm === true) {
              try {
                const params = {
                  email: email,
                  username: username,
                  description: description,
                  password: password,
                };
                const response = await axios.post(
                  "https://express-airbnb-api.herokuapp.com/user/sign_up",
                  params,
                  { headers: { "Content-Type": "multipart/form-data" } }
                );
                console.log(response.data);
                // const userToken = "secret-token";
                // setToken(userToken);
              } catch (error) {
                console.log(error.message);
                console.log(error.response.data);
                if (error.response.data) {
                  alert(error.response.data.error);
                }
              }
            } else {
              return null;
            }
          }}
        />
        <Button title="Already have a account? Sign in"></Button>
      </View>
    </View>
  );
}

// A Faire Créer un CustomInput en composant de façon a utiliser toujours le même objet pour tous les inputs.
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },

  coverImage: {
    height: 150,
    width: 100,
    marginRight: 20,
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
});
