import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";
import DishRow from "../components/Dish_Row";

import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { StarIcon, MapPinIcon } from "react-native-heroicons/solid";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setrestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    dispatch(
      setrestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, []);
  return (
    <>
      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="h-56 w-full p-4 bg-gray-300"
          />
          <TouchableOpacity
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View>
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-1 my-1">
              <View className="flex-row items-center space-x-2">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> - {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" size={22} opacity={0.4} />
                <Text className="text-xs text-gray-500">
                  Nearby - {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon size={22} color="gray" opacity={0.6} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

          {/* Dish Row */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
      <BasketIcon />
    </>
  );
};

export default RestaurantScreen;
