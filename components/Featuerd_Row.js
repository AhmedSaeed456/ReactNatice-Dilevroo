import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./Restaurant_card_Component";
import sanityClient from "../sanity";

const FeatuerdRow = ({ id, label, description }) => {
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    const query = `
    *[_type == "featured" && _id == $id]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type->{
          name
        }
      }
    }[0]
    `;

    sanityClient
      .fetch(query, { id })
      .then((data) => {
        setRestaurant(data?.restaurants);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);
  console.log(restaurant);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{label}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        {restaurant?.map((res) => (
          <RestaurantCard
            key={res._id}
            id={res._id}
            imgUrl={res.image}
            title={res.name}
            rating={res.rating}
            genre={res.type?.name}
            address={res.address}
            short_description={res.description}
            dishes={res.dishes}
            long={res.long}
            lat={res.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeatuerdRow;
