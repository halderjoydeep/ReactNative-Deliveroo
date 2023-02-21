import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { currencyFormat } from '../utils/CurrencyFormatter';
import { urlFor } from '../sanity';
import { addToBasket, removeFromBasket } from '../store/basketSlice';

const DishRow = ({
  _id,
  name,
  image,
  short_description,
  price,
  restaurant,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const item = useSelector((state) =>
    state.basket.items.find((item) => item._id === _id)
  );

  const dispatch = useDispatch();
  function addItemToBasket() {
    dispatch(
      addToBasket({
        _id,
        name,
        image,
        short_description,
        price,
        restaurant,
        quantity: 1,
      })
    );
  }

  function removeItemFromBasket() {
    dispatch(removeFromBasket({ _id }));
  }

  function toggle() {
    setIsPressed((prev) => !prev);
  }

  return (
    <>
      <TouchableOpacity
        onPress={toggle}
        className="flex-row space-x-2 p-4 border-t border-gray-200 bg-white "
      >
        {/* Dish Info */}
        <View className="flex-1">
          <Text className="text-lg mb-1">{name}</Text>
          <Text className="text-sm text-gray-400 mb-2">
            {short_description}
          </Text>
          <Text className="text-sm text-gray-400">
            {currencyFormat(price, '₹')}
          </Text>
        </View>
        <Image
          source={{ uri: urlFor(image).url() }}
          className="h-20 w-20 bg-gray-300 p-4"
          style={{
            borderColor: '#f3f3f4',
            borderWidth: 2,
          }}
        />
      </TouchableOpacity>
      {/* Dish Buying Menu */}
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 py-2">
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircleIcon
                size={40}
                color={item?.quantity ? '#00ccbb' : 'gray'}
              />
            </TouchableOpacity>
            <Text>{item ? item.quantity : 0}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon
                size={40}
                color={item?.quantity >= 20 ? 'gray' : '#00ccbb'}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
