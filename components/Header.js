import { View, Text, Image } from 'react-native';
import { ChevronDownIcon, UserIcon } from 'react-native-heroicons/outline';

const Header = () => {
  return (
    <View className="flex-row items-center space-x-2 mx-4 pb-3">
      {/* Logo */}
      <Image
        source={{ uri: 'https://links.papareact.com/wru' }}
        className="h-7 w-7 p-4 rounded-full bg-gray-300"
      />
      {/* Header text */}
      <View className="flex-1">
        <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
        <Text className="font-bold text-xl">
          Current Location <ChevronDownIcon size={20} color="#00ccbb" />{' '}
        </Text>
      </View>
      {/* User icon */}
      <UserIcon size={35} color="#00ccbb" />
    </View>
  );
};

export default Header;
