import { useNavigation } from "@react-navigation/core";
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
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      //console.log(response.data[0].photos[1].url);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.container}>
            <Text>Welcome home!</Text>
            <Button
              title="Go to Profile"
              onPress={() => {
                navigation.navigate("Profile", { userId: 123 });
              }}
            />
            <FlatList
              //horizontal={true}
              data={data}
              // keyExtractor={(elem) => {
              //   elem._id;
              // }}
              renderItem={({ item }) => {
                console.log(item.photos);
                // console.log(item.user.account.photo.url);
                const numberStars = item.ratingValue;

                return (
                  <View>
                    <TouchableOpacity>
                      <Image
                        style={styles.coverImage}
                        source={{
                          uri: item.photos[0].url,
                          //uri: "https://a2.muscache.com/im/pictures/a560cdc0-425d-4d7b-ab8a-f98481eeb23f.jpg",
                        }}
                      ></Image>
                    </TouchableOpacity>

                    <View style={styles.price}>
                      <ImageBackground>
                        <Text style={styles.priceText}>{item.price} €</Text>
                      </ImageBackground>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.textInfoView}>
                        <Text numberOfLines={1} ellipsizeMode="tail">
                          {item.title}
                        </Text>
                        <Text>{item.ratingValue}</Text>
                        <Image
                          style={styles.star}
                          source={require("../assets/star-on.png")}
                        ></Image>
                        <Text>{item.reviews}</Text>
                      </View>
                      <View style={styles.userView}>
                        <Image
                          style={styles.userImage}
                          source={{
                            uri: item.user.account.photo.url,
                          }}
                        ></Image>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  coverImage: {
    height: 150,
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
  star: {
    height: 30,
    width: 30,
  },
});
