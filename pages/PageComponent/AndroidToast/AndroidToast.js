import { ToastAndroid } from "react-native";
export default function androidToast(info) {
  ToastAndroid.show(info, ToastAndroid.SHORT);
}
