import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import CustomButton from "../../ui/CustomButton";

function ImagePicker({ onImagePick }) {
  const [imagePicked, setImagePicked] = useState();
  const [statusInfo, requestPermission] = useCameraPermissions();

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

  async function imageHandler() {
    const reponse = await verifyPermissions();

    if (!reponse) {
      return;
    }

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImagePicked(result.assets[0].uri);
    onImagePick(result.assets[0].uri);
  }

  let image = <Text>No Image Captured! </Text>;

  if (imagePicked) {
    image = <Image style={styles.image} source={{ uri: imagePicked }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{image}</View>
      <CustomButton onPress={imageHandler} icon={"camera"}>
        Take Image
      </CustomButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
