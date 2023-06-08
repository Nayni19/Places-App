import { View, Text, Image } from "react-native";
import { Pressable } from "react-native";

function PlacesItem({ place, onSelect }){
  return (
    <Pressable onPress={onSelect}>
      <View>
        <Image source={{ uri: place.imageUri }} />
        <View>
          <Text>{place.title}</Text>
          <Text>{place.address}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PlacesItem;
