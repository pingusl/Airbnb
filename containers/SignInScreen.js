//import { useNavigation } from "@react-navigation/core";
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

export default function SignInScreen({ setToken, navigation }) {
  // const navigation = useNavigation();
  const [email, setEmail] = useState("nono@airbnb-api.com");
  const [password, setPassword] = useState("pass");
  const [feedBackName, setFeedBackName] = useState("");
  const [feedBackPassword, setFeedBackPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
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
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.header}>
          <Image
            style={styles.coverImage}
            source={require("../assets/logoAirbnb.png")}
          ></Image>
          <Text style={styles.title}>Sign In</Text>
        </View>
        <View>
          <CustomInput placeholder="email" setState={setEmail} value={email} />

          <CustomInput
            placeholder="password"
            setState={setPassword}
            value={password}
            password={true}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>Create an account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#727272",
    marginTop: 30,
  },
  coverImage: {
    height: 150,
    width: 100,
    // marginRight: 20,
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
