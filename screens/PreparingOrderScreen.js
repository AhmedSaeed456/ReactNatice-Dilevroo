import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as animatbale from "react-native-animatable";
import * as progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("DeliveryScreen");
    }, 3000);
  }, []);
  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <animatbale.Image
        source={require("../assets/orderLoading.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="w-96 h-96"
      />
      <animatbale.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for restaurant to accept your order
      </animatbale.Text>
      <progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
