import { View, Text, TouchableOpacity, Image } from 'react-native';
import { StarIcon } from 'react-native-heroicons/solid';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../sanity';

const RestaurantCard = ({ restaurant }) => {
  const navigation = useNavigation();
  const { image, name, rating, type, address } = restaurant;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Restaurant', { restaurant });
      }}
      className="bg-white rounded-md shadow-md overflow-hidden mr-3"
    >
      <Image
        source={{ uri: urlFor(image).url() }}
        className="w-64 h-36 rounded-sm"
      />
      <View className="px-3 pb-4 pt-2 gap-1">
        {/* Title */}
        <Text className="text-lg font-bold">{name}</Text>
        {/* Rating */}
        <View className="flex-row items-center space-x-1">
          <StarIcon size={22} color="green" opacity={0.5} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> • {type.name}
          </Text>
        </View>
        {/* Location */}
        <View className="flex-row items-center space-x-1">
          <MapPinIcon size={22} color="gray" opacity={0.4} />
          <Text className="text-xs text-gray-500">Nearby • {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
