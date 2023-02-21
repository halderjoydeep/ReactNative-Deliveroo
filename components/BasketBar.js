import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { currencyFormat } from '../utils/CurrencyFormatter';
import { selectItems, selectItemsByRestaurant } from '../store/basketSlice';
import { selectRestaurant } from '../store/restaurantSlice';

const BasketBar = () => {
  const navigation = useNavigation();

  const restaurant = useSelector(selectRestaurant);
  const items = useSelector((state) =>
    selectItemsByRestaurant(state, restaurant)
  );
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (totalItems === 0) {
    return null;
  }

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className="flex-row items-center py-3 px-4 mx-5 bg-[#00ccbb] rounded-lg space-x-1"
      >
        <Text className="px-2 py-1 text-white text-lg font-extrabold  bg-[#01A296]">
          {totalItems}
        </Text>
        <Text className="flex-1 text-center text-white text-lg font-extrabold">
          View Basket
        </Text>
        <Text className="text-white text-lg font-extrabold">
          {currencyFormat(totalPrice, '₹')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketBar;
