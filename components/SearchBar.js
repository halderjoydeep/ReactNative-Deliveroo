import { View, TextInput } from 'react-native';
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';

const SearchBar = () => {
  return (
    <View className="flex-row items-center space-x-2 mx-4 pb-3">
      <View className="flex-row flex-1 items-center space-x-2 p-3 bg-gray-200 rounded-md">
        <MagnifyingGlassIcon size={20} color="gray" />
        <TextInput placeholder="Restaurants and cuisines" className="flex-1" />
      </View>
      <AdjustmentsVerticalIcon color="#00ccbb" />
    </View>
  );
};

export default SearchBar;
