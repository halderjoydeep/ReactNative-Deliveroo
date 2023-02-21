import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '../sanity';
import { BasketBar, DishRow } from '../components';
import { setRestaurant } from '../store/restaurantSlice';
import { QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
} from 'react-native-heroicons/solid';

const RestaurantScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const restaurant = route.params.restaurant;
  const { name, short_description, image, type, rating, address, dishes } =
    restaurant;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRestaurant(restaurant));
  }, []);

  return (
    <>
      <BasketBar />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(image).url(),
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-50 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#00ccbb" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="p-4 space-y-2">
            {/* Restaurant's name */}
            <Text className="text-2xl font-bold">{name}</Text>
            {/* Restaurant's details */}
            <View className="flex-row items-center space-x-2">
              {/* Restaurant's Rating */}
              <View className="flex-row items-center space-x-1">
                <StarIcon size={22} color="green" opacity={0.5} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> • {type.name}
                </Text>
              </View>
              {/* Restaurant's location */}
              <View className="flex-row items-center space-x-1">
                <MapPinIcon size={22} color="gray" opacity={0.4} />
                <Text className="text-xs text-gray-500">
                  Nearby • {address}
                </Text>
              </View>
            </View>
            {/* Restaurant's description */}
            <Text className="text-sm text-gray-500">{short_description}</Text>
          </View>

          {/* Food Allergy Button */}
          <TouchableOpacity className="flex-row items-center space-x-3 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={22} />
            <Text className="flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#00ccbb" size={22} />
          </TouchableOpacity>
        </View>

        {/* Menu */}
        <View className="pb-40">
          <Text className="px-4 pt-4 pb-3 text-xl font-bold">Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              _id={dish._id}
              name={dish.name}
              image={dish.image}
              price={dish.price}
              short_description={dish.short_description}
              restaurant={restaurant}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
