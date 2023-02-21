import { View, Text, ScrollView } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';

const FeaturedRow = ({ title, desc, restaurants }) => {
  return (
    <View>
      {/* Featured Row Title */}
      <View className="flex-row items-center justify-between mt-4 px-4">
        <Text className="text-lg font-bold">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      {/* Featured Row Description */}
      <Text className="px-4 text-xs text-gray-500">{desc}</Text>

      {/* Featured Row Card display */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="pt-4"
      >
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
