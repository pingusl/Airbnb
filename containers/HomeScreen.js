import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, ActivityIndicator } from "react-native";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react/cjs/react.production.min";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  useEffect(() => {
    console.log("Passage par useEffect");
  }, []);
  // const response = axios.get("https://express-airbnb-api.herokuapp.com/rooms");
  // console.log(response.data);

  return (
    <View>
      <Text>Welcome home!</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
      <ActivityIndicator />
    </View>
  );
}
