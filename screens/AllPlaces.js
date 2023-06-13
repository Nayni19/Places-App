import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

export default function AllPlaces({ route }) {
  const [placesData, setPlacesData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setPlacesData((currData) => [...currData, route.params.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={placesData} />;
}
