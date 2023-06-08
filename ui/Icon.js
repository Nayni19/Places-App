import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function Icon({ name, size, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.press]}
      onPress={onPress}
    >
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  press: {
    opacity: 0.7,
  },
});
