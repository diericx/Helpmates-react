import Meteor from "react-native-meteor";
import Expo from "expo";

const { manifest } = Expo.Constants;
const api = manifest.packagerOpts.dev
  ? manifest.debuggerHost
      .split(":")
      .shift()
      .concat(":3000/websocket")
  : "localhost:3000/websocket";

export default function() {
  const url = "ws://localhost:3000/websocket"; //'ws://10.7.107.240:3000/websocket';
  Meteor.connect(url);
}
