import { AsyncStorage } from "react-native"

export var _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem('@MySuperStore:' + key);
    return value;
   } catch (error) {
     // Error retrieving data
     console.log("ERROR RETREIVING LOCAL DATA WITH KEY: ", key);
     return null;
   }
}

export var _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem('@MySuperStore:' + key, value);
  } catch (error) {
    // Error saving data
    console.log("ERROR STORING LOCAL DATA WITH KEY: ", key);
  }
}

export async function GetChosenUniversityId() {
  var value = await _retrieveData("chosenUniversityId");
  return value;
}

export function SetChosenUniversityId(universityId) {
  console.log("STORING: ", universityId)
  _storeData("chosenUniversityId", universityId);
}