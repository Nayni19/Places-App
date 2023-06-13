import { TextInput, View, StyleSheet, Text, ScrollView } from "react-native";
import { Colors } from "../../constants/colors";
import Imagepicker from "../Image/ImagePicker";
import LocationPicker from "../Image/LocationPicker";
import Button from "../../ui/Button";
import { useCallback, useState } from "react";
import { Place } from "../../models/places.js";

const PlacesForm = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState();
  const [pickedImage, setPickedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTextHandler(title) {
    setEnteredTitle(title);
  }

  function saveHandler() {
    const placeData = new Place(enteredTitle, pickedImage, pickedLocation);
    onCreatePlace(placeData);
  }
  function pickImageHandler(imageUri) {
    setPickedImage(imageUri);
  }
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}></Text>
        <TextInput style={styles.input} onChangeText={changeTextHandler} />
        <Imagepicker onImagePick={pickImageHandler} />
        <LocationPicker onLocationPick={pickLocationHandler} />
        <Button onPress={saveHandler}>Submit</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
export default PlacesForm;
