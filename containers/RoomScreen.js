import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";
import MapView from "react-native-maps";

export default function RoomScreen({ route }) {
  //console.log(route);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //   console.log(location);
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const id = "58ff73cc1765a9979391c532";
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.idRoom}`
        );
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // const { params } = useRoute();
  const displayStars = (num) => {
    const tab = [];
    for (let i = 0; i < 5; i++) {
      if (i < num) {
        tab.push(<Entypo key={i} name="star" size={24} color="#FCB101" />);
      } else {
        tab.push(<Entypo key={i} name="star" size={24} color="grey" />);
      }
    }
    return tab;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View>
            <Image
              style={styles.coverImage}
              source={{ uri: data.photos[0].url }}
            ></Image>

            <View style={styles.price}>
              <ImageBackground>
                <Text style={styles.priceText}>{data.price} €</Text>
              </ImageBackground>
            </View>
            <View style={styles.infoView}>
              <View style={styles.textInfoView}>
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {data.title}
                </Text>
                <View style={styles.rating}>
                  {displayStars(data.ratingValue)}
                  <Text>{data.reviews} reviews</Text>
                </View>
              </View>
              <View style={styles.userView}>
                <Image
                  style={styles.userImage}
                  source={{
                    uri: data.user.account.photo.url,
                  }}
                ></Image>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setShowText(!showText);
                }}
              >
                <Text numberOfLines={showText ? null : 3} ellipsizeMode="tail">
                  {data.description}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
        </View>
      )}
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
  coverImage: {
    height: 150,
    width: 350,
    marginRight: 20,
    marginBottom: 10,
  },
  map: {
    height: 350,
    width: 350,
    marginRight: 20,
    marginBottom: 10,
  },
  userView: {
    flex: 1,
    width: 50,
    paddingLeft: 20,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50,

    // marginRight: 20,
  },
  price: {
    position: "absolute",
    top: 100,
    left: 10,
    height: 40,
    width: 100,
    backgroundColor: "black",
    color: "white",
  },
  priceText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
  },
  infoView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInfoView: {
    flex: 4,
  },
  rating: {
    flexDirection: "row",
  },
});
