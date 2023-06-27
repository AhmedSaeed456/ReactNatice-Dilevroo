import { View, Text, TouchableOpacity, Button } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasketItems,
  selectTotalPrice,
  resetBasket,
} from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const totalPrice = useSelector(selectTotalPrice);

  const resetBasketHandler = () => {
    dispatch(resetBasket());
  };

  return (
    <View className="z-50 w-full ">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Basket");
        }}
        className="flex-row bg-[#00CCBB]  rounded-lg space-x-1 items-center p-4"
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] px-2 py-1 rounded-md">
          {items.length}
        </Text>
        <Text className="text-white flex-1 text-center text-lg font-extrabold">
          View Basket
        </Text>
        <Text className="text-white font-extrabold text-lg bg-[#01A296] px-2 py-1 rounded-md">
          <Currency quantity={totalPrice} Currency="GBP" />
        </Text>
        {items.length && (
          <Button title="X" onPress={resetBasketHandler} color="red" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
