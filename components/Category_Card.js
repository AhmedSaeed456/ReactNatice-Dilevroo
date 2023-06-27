//rnfe
import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { urlFor } from "../sanity";

const CategoryCard = ({ imgUrl, label }) => {
  return (
    <TouchableOpacity className="mx-1">
      <Image source={{ uri: imgUrl }} className="h-20 w-20 rounded" />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {label}
      </Text>
    </TouchableOpacity>
  );
};
export default CategoryCard;
