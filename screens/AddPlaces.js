import PlacesForm from "../components/Places/PlacesForm";

export default function AddPlaces({ navigation }) {
  function createPlaceHandler(place) {
    navigation.navigate("AllPlaces", { place: place });
  }

  return <PlacesForm onCreatePlace={createPlaceHandler} />;
}
