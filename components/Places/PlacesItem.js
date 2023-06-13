import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import { Pressable } from "react-native";
import { Colors } from "../../constants/colors";

function PlacesItem({ place, onSelect }) {
  return (
    <Pressable
      onPress={onSelect}
      style={(pressed) => [pressed && styles.pressed]}
    >
      <View style={styles.item}>
        <Image source={{ uri: place.imageUri }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.address}>{place.address}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default PlacesItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: "100%",
  },
  info: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    marginVertical: 8,
    fontSize: 12,
    color: Colors.gray700,
  },
});
