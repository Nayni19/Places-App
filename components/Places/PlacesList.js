import { FlatList } from "react-native";
import PlacesItem from "./PlacesItem";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function PlacesList({ places }) {
  if (!places || places.length == 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>No places registered!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlacesItem place={item} />}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  fallBackContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  fallBackText: {
    fontSize: 16,
    color: Colors.primary100
  },
});