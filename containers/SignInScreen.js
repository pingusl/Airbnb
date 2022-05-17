import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("nono@airbnb-api.com");
  const [password, setPassword] = useState("pass");
  const [feedBackName, setFeedBackName] = useState("");
  const [feedBackPassword, setFeedBackPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <View>
      <View>
        <Text>
          Email: {feedBackName}
          {message}
        </Text>

        <TextInput
          placeholder="Saisir email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />

        <Text>Password: {feedBackPassword}</Text>

        <TextInput
          placeholder="Password"
          secureTextEntry={false}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />

        <Button
          title="Sign in"
          onPress={async () => {
            if (!email) {
              const alert = "Saisie ton username";
              setFeedBackName(alert);
            } else if (!password) {
              setFeedBackPassword("Saisie ton password!");
            } else {
              try {
                const params = {
                  email: email,
                  password: password,
                };

                const response = await axios.post(
                  "https://express-airbnb-api.herokuapp.com/user/log_in",
                  params,
                  { headers: { "Content-Type": "multipart/form-data" } }
                );
                console.log(response.data);
                if (response.data.token !== null) {
                  alert("access granted!");
                  const userToken = response.data.token;
                  setToken(userToken);
                }
              } catch (error) {
                console.log(error);
                setMessage("Paramêtres de connexion incorrect...!");
              }
            }
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
