import { Button, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";

export default function SignUpScreen({ setToken }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View>
      <View>
        <Text>Name: </Text>
        <KeyboardAwareScrollView>
          <TextInput
            placeholder="Username"
            onChangeText={(text) => {
              setUserName(text);
            }}
            value={userName}
          />
        </KeyboardAwareScrollView>
        <Text>Password: </Text>
        <KeyboardAwareScrollView>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
        </KeyboardAwareScrollView>
        <Button
          title="Sign up"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
      </View>
    </View>
  );
}
