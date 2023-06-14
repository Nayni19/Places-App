import { Image, ScrollView, StyleSheet, View } from "react-native";
import CustomButton from "../ui/CustomButton";
import { Colors } from "../constants/colors";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

export default function PlaceDetails({ route, navigation }) {
  const [loadPlace, setLoadPlace] = useState();
  const selectedPlace = route.params.placeId;

  useEffect(() => {
    async function loadPLaces() {
      const place = await fetchPlaceDetails(selectedPlace);
      setLoadPlace(place);
      navigation.setOptions({ title: place.title });
    }

    loadPLaces();
  }, [selectedPlace]);

  function viewMapHandler() {
    navigation.navigate("Map", {
      initialLat: loadPlace.location.lat,
      initialLng: loadPlace.location.lng,
    });
  }

  if (!loadPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: loadPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{loadPlace.address}</Text>
        </View>
        <CustomButton icon={"map"} onPress={viewMapHandler}>
          View on Map
        </CustomButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
