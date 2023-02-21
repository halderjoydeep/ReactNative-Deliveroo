import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import { currencyFormat } from '../utils/CurrencyFormatter';
import {
  removeFromBasket,
  selectItems,
  selectItemsByRestaurant,
} from '../store/basketSlice';
import { selectRestaurant } from '../store/restaurantSlice';

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector((state) =>
    selectItemsByRestaurant(state, restaurant)
  );
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const dispatch = useDispatch();
  return (
    <SafeAreaView
      className={`flex-1 bg-gray-900 ${Platform.select({ android: 'pt-12' })}`}
    >
      <View className="flex-1 bg-gray-100 rounded-t-2xl overflow-hidden">
        {/* Basket Header */}
        <View className="p-5 items-center bg-white border-b border-b-[#00ccbb] shadow-sm">
          <Text className="text-lg font-bold">Basket</Text>
          <Text className="text-gray-400">{restaurant.name}</Text>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-3 right-5"
          >
            <XCircleIcon size={50} color="#00ccbb" />
          </TouchableOpacity>
        </View>

        {/* Delivery Time */}
        <View className="flex-row items-center space-x-4 p-4 my-5 bg-white  ">
          <Image
            source={{ uri: 'https://links.papareact.com/wru' }}
            className="w-7 h-7 p-4 rounded-full bg-gray-300"
          />
          <Text className="flex-1">Delivery in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>

        {/* Dishes */}
        <ScrollView className="divide-y divide-gray-200">
          {items.map((item) => (
            <View
              key={item._id}
              className="flex-row items-center space-x-4 px-5 py-2 bg-white"
            >
              <Text className="text-[#00ccbb]">{item.quantity} x</Text>
              <Image
                source={{ uri: urlFor(item.image).url() }}
                className="w-12 h-12 p-4 bg-gray-300  rounded-full"
              />
              <Text className="flex-1">{item.name}</Text>
              <Text className="text-gray-600">
                {currencyFormat(item.price, '₹')}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ _id: item._id }))}
              >
                <Text className="text-xs text-[#00ccbb]">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Order Summary */}
        <View className="bg-white p-5 mt-5">
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Subtotal</Text>
              <Text className="text-gray-400">
                {currencyFormat(totalPrice, '₹')}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Delivery Fee</Text>
              <Text className="text-gray-400">{currencyFormat(5, '₹')}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-bold">Order Total</Text>
              <Text className="font-extrabold">
                {currencyFormat(totalPrice + 5, '₹')}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('OrderPrepairing')}
            className="items-center p-4 my-4 bg-[#00ccbb] rounded-lg "
          >
            <Text className="text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
