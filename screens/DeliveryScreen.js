import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';

import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import * as Progress from 'react-native-progress';

import { XMarkIcon } from 'react-native-heroicons/solid';
import { selectRestaurant } from '../store/restaurantSlice';
import { clearBasket } from '../store/basketSlice';

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearBasket());
  });

  return (
    <View className="flex-1 bg-[#00ccbb]">
      <SafeAreaView className={`${Platform.select({ android: 'pt-12' })} z-50`}>
        <View className="flex-row items-center justify-between p-5">
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <XMarkIcon size={30} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-base font-light">Order Help</Text>
        </View>

        {/* Delivery Card */}
        <View className=" mx-5 my-2 p-5 rounded-md bg-white shadow-lg z-50">
          <View className="flex-row items-center justify-between ">
            <View>
              <Text className="text text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={{ uri: 'https://links.papareact.com/fls' }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar indeterminate={true} size={30} color="#00ccbb" />
          <Text className="text-gray-500 mt-3">
            Your order at {restaurant.name} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      {/* Map */}
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          key={restaurant._id}
          coordinate={{ latitude: restaurant.lat, longitude: restaurant.long }}
          title={restaurant.name}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00ccbb"
        />
      </MapView>

      <SafeAreaView className="flex-row items-center bg-white p-5 space-x-5">
        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          className="h-12 w-12 bg-gray-300 rounded-full"
        />
        <View className="flex-1">
          <Text className="text-lg">Joydeep Halder</Text>
          <Text className="text-xs text-gray-400">Your rider</Text>
        </View>

        <Text className="text-lg text-[#00ccbb] font-bold">Call Now</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
