import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";

export default function SignInScreen({ setToken, userToken }) {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [feedBackName, setFeedBackName] = useState("");
  const [feedBackPassword, setFeedBackPassword] = useState("");

  return (
    <View>
      <View>
        <Text>Name: {feedBackName}</Text>
        <KeyboardAwareScrollView>
          <TextInput
            placeholder="Username"
            onChangeText={(text) => {
              setUserName(text);
            }}
            value={userName}
          />
        </KeyboardAwareScrollView>
        <Text>Password: {feedBackPassword}</Text>
        <KeyboardAwareScrollView>
          <TextInput
            placeholder="Password"
            secureTextEntry={false}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
        </KeyboardAwareScrollView>
        <Button
          title="Sign in"
          onPress={async () => {
            if (!userName) {
              const alert = "Saisie ton username";
              setFeedBackName(alert);
            } else if (!password) {
              setFeedBackPassword("Saisie ton password!");
            } else {
              const userToken = "secret-token";
              setToken(userToken);
              navigation.navigate("Tab", {
                userName: userName,
                password: password,
              });
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
