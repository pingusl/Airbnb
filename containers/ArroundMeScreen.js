import { useState } from "react";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const ArroundMeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : (
    <View>
      <Text>loaded!</Text>
    </View>
  );
};
export default ArroundMeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
});
