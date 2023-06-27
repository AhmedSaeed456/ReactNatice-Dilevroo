import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./Category_Card";
import sanityClient, { urlFor } from "../sanity";

const Categories = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    sanityClient.fetch(`*[_type == "category"]`).then((data) => {
      setCategory(data);
    });
  }, []);
  console.log("category ::::=>", category);
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {/* TODO : category card */}
        {category.map((cat) => (
          <CategoryCard
            key={cat._id}
            imgUrl={cat.image ? urlFor(cat.image).width(200).url() : null}
            label={cat.name}
          />
        ))}
      </ScrollView>
    </View>
  );
};
export default Categories;
