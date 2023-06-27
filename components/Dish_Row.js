import { Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemById,
  selectBasketItems,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemById(state, id));
  const dispatch = useDispatch();

  const addItemToBasketHandler = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  const removeItemFromBasketHandler = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsPressed(!isPressed);
        }}
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400">
              <Currency quantity={price} currency="GBP" />
            </Text>
          </View>

          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white rounded-xl flex">
          <View className="flex-row items-center space-x-2 ml-3">
            <TouchableOpacity
              onPress={removeItemFromBasketHandler}
              disabled={!items.length}
            >
              <MinusCircleIcon
                size={40}
                color={items.length <= 0 ? "gray" : "#00CCBB"}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasketHandler}>
              <PlusCircleIcon size={40} color={"#00CCBB"} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};
export default DishRow;
