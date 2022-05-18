import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import axios from "axios";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

import CustomInput from "../components/CustomInput";

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
        <Image
          style={styles.coverImage}
          source={require("../assets/logoAirbnb.png")}
        ></Image>
        <Text>Sign Up</Text>
      </View>
      <View>
        <CustomInput placeholder="email" setState={setEmail} value={email} />

        <CustomInput
          placeholder="password"
          setState={setPassword}
          value={password}
          password={true}
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
                  const storeData = async (value) => {
                    try {
                      await AsyncStorage.setItem("@userToken", userToken);
                    } catch (e) {
                      console.log(error);
                    }
                  };
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
});
