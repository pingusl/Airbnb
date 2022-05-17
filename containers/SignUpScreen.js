import { Button, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("seb1@lereacteur.io");
  const [userName, setUserName] = useState("seb");
  const [description, setDescription] = useState("reactNative");
  const [password, setPassword] = useState("pass");
  const [confirmPassword, setConfirmPassword] = useState("pass");
  const [messageEmail, setMessageEmail] = useState("");
  const [messageUserName, setMessageUserName] = useState("");
  const [messageDescription, setMessageDescription] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  return (
    <View>
      <View>
        <View>
          <TextInput
            placeholder="E-mail"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />

          <TextInput
            placeholder="Username"
            onChangeText={(text) => {
              setUserName(text);
            }}
            value={userName}
          />

          <TextInput
            placeholder="Describ yourself in a few words..."
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            value={confirmPassword}
          />
        </View>

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
            if (!userName) {
              setMessageUserName("Missing username ");
              validForm = false;
            }
            if (!userName) {
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
                  username: userName,
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
                alert("Email already assign!");
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
