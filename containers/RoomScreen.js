import { useRoute } from "@react-navigation/core";
import { Text, View, StyleSheet } from "react-native";

export default function RoomScreen() {
  // const { params } = useRoute();
  return (
    <View style={styles.container}>
      <Text>Room</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
});
