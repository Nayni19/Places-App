import { TextInput, View, StyleSheet, Text, ScrollView } from "react-native";
import { Colors } from "../../constants/colors";
import Imagepicker from "../Image/ImagePicker";

const PlacesForm = () => {
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}></Text>
        <TextInput style={styles.input} />
        <Imagepicker />
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
