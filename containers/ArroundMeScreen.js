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
    <ActivityIndicator />
  ) : (
    <View>
      <Text>loaded!</Text>
    </View>
  );
};
