import { ScrollView, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { Redirect, router } from 'expo-router';
import {images} from '../constants';
import 'react-native-reanimated';
import GlobalProvider, { useGlobalContext } from '../context/GlobalProvider';


export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/quiz" />;
  return (
    <GlobalProvider>
      <SafeAreaView className="bg-zinc-800">
        <ScrollView contentContainerStyle={{height:'100%'}}>
          <View className="w-full justify-center items-center h-full px-4">
            <Image
              source={images.ilogo}
              className="w-44 h-44 mb-20 mx-auto bottom-10"
              resizeMode='contain'
              />
            <CustomButton
            title="Continue With Email"
            handlePress={() => router.push('sign-in')}
            containerStyles="w-full mt-7 pt-4 pb-4 bg-amber-400 rounded-2xl"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GlobalProvider>
  );
}
