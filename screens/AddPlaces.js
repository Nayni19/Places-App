import PlacesForm from "../components/Places/PlacesForm";
import { insertPlace } from "../util/database";

export default function AddPlaces({ navigation }) {
  async function createPlaceHandler(place) {
    console.log(place);
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  }

  return <PlacesForm onCreatePlace={createPlaceHandler} />;
}
