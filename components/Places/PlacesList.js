import { FlatList } from "react-native";
import PlacesItem from "./PlacesItem";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places }) {
  const navigation = useNavigation();
  function onPressHandler(id) {
    navigation.navigate("PlacesDetails", { placeId: id });
  }
  if (!places || places.length == 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>No places registered!</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlacesItem place={item} onSelect={onPressHandler} />
      )}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallBackContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  fallBackText: {
    fontSize: 16,
    color: Colors.primary100,
  },
});
