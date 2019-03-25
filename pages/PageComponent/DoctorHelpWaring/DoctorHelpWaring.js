/**
 * Created by zxf on 2018.9.17.
 */
import { Image, Text, View } from "react-native";
import { BackgroundImage } from "../../../components/BackgroundImage/BackgroundImage";
import React from "react";

export default function DoctorHelpWaring(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: dp(82),
        width: "100%"
      }}
    >
      <BackgroundImage
        source={require("../img/doctorIcon.png")}
        style={{ width: dp(1725), height: dp(125) }}
      />
    </View>
  );
}
