import { useState, useEffect } from "react";
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
import MapView from "react-native-maps";
import axios from "axios";

const ArroundMeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const id = "58ff73cc1765a9979391c532";
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: data.location[1],
          longitude: data.location[0],
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
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
  map: {
    height: 700,
    width: 400,
    marginBottom: 10,
  },
});
