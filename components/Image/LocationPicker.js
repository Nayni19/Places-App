import {
  useForegroundPermissions,
  PermissionStatus,
  getCurrentPositionAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import CustomButton from "../../ui/CustomButton";
import { getAddress, getMapPreview } from "../../util/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

function LocationPicker({ onLocationPick }) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [locationPicked, setLocationPicked] = useState();
  const [statusInfo, requestPermission] = useForegroundPermissions();

  async function verifyPermissions() {
    if (statusInfo.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();
      return response.granted;
    }

    if (statusInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "Please give the necessary permissions."
      );
      return false;
    }
    return true;
  }

  async function locationHandler() {
    const reponse = await verifyPermissions();

    if (!reponse) {
      return;
    }

    const result = await getCurrentPositionAsync();
    setLocationPicked({
      lat: result.coords.latitude,
      lng: result.coords.longitude,
    });
  }

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setLocationPicked(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (locationPicked) {
        const address = await getAddress(
          locationPicked.lat,
          locationPicked.lng
        );
        onLocationPick({ ...locationPicked, address: address });
      }
    }

    handleLocation();
  }, [locationPicked, onLocationPick]);

  let location = <Text>No Location Picked! </Text>;

  if (locationPicked) {
    location = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(locationPicked.lat, locationPicked.lng) }}
      />
    );
  }

  function pickLocation() {
    navigation.navigate("Map");
  }

  return (
    <View>
      <View style={styles.mapPreview}>{location}</View>
      <View style={styles.actions}>
        <CustomButton onPress={locationHandler} icon={"location"}>
          Locate User
        </CustomButton>
        <CustomButton onPress={pickLocation} icon={"map"}>
          Pick on Map
        </CustomButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
