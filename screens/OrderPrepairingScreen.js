import { SafeAreaView } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';

const OrderPrepairingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 1000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Animatable.View
        className="flex-1 items-center justify-center bg-[#00ccbb]"
        animation="slideInUp"
        iterationCount={1}
        duration={1000}
      >
        <Animatable.Image
          source={require('../assets/orderLoading2.gif')}
          className="w-80 h-80 p-4"
          animation="slideInUp"
          iterationCount={1}
        />
        <Animatable.Text
          animation="slideInUp"
          iterationCount={1}
          className="text-lg text-white text-center my-10 font-bold px-5"
        >
          Waiting for restaurant to accept your order!
        </Animatable.Text>

        <Progress.Circle size={60} indeterminate={true} color="white" />
      </Animatable.View>
    </SafeAreaView>
  );
};

export default OrderPrepairingScreen;
