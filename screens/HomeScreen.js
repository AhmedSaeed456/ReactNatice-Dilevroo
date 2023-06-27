import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories_Components";
import FeatuerdRow from "../components/Featuerd_Row";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  //useLayoutEffect called before DOM updated
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const query = `*[_type == "featured"]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type->{
          name
        }
      }
    }`;

    sanityClient
      .fetch(query)
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  console.log(featuredCategories);
  return (
    <SafeAreaView className=" bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      <View className="flex-row items-center space-xp-2 pb-2 mx-4 ">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 rounded-xl">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            placeholder="Search"
            keyboardType="default"
            className="flex-1"
          />
        </View>
        <AdjustmentsVerticalIcon size={30} color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        className=" bg-gray-100 "
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* categoreis */}
        <Categories />
        {/* FeaturedRow */}
        {featuredCategories?.map((category) => (
          <FeatuerdRow
            key={category._id}
            id={category._id}
            label={category.name}
            description={category.description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
