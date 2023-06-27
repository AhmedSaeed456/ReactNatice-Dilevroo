import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectTotalPrice,
} from "../features/basketSlice";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import { Dimensions } from "react-native";
const screenHeight = Dimensions.get("window").height;

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const total = useSelector(selectTotalPrice);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  return (
    <SafeAreaView className="relative">
      <View className="relative">
        {/* Header */}
        <View className="flex-row items-center mx-5 bg-white ">
          <View className="py-9 flex-1 items-center">
            <Text className=" text-center text-lg font-bold">BasketScreen</Text>
            <Text className="text-center text-xs">{restaurant.title}</Text>
          </View>

          <TouchableOpacity onPress={navigation.goBack}>
            <XCircleIcon size={40} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        {/* Dekivery */}
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200 ">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB] font-bold">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="GBP" />
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text className="text-[#00CCBB]">
                  remove<Text className="text-gray-500"> x1</Text>
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View>
          <View className="p-5 bg-white mt-5 space-y-4">
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Subtotal</Text>
              <Text className="text-gray-400">
                <Currency quantity={total} currency="GBP" />
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Delivery Fee</Text>
              <Text className="text-gray-400">
                <Currency quantity={total > 0 ? 5.99 : 0} currency="GBP" />
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-900 font-bold text-lg">Total</Text>
              <Text className="text-gray-900 font-bold text-lg">
                <Currency
                  quantity={total + (total > 0 ? 5.99 : 0)}
                  currency="GBP"
                />
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("PreparingOrderScreen")}
              className="rounded-lg bg-[#00CCBB] p-4"
            >
              <Text className="text-center text-white text-lg font-bold">
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
