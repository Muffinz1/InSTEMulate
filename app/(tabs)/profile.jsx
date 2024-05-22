import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { icons } from "../../constants";
import { signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUsername, getUserAvatar } from "../../lib/appwrite";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const defaulltUser = 'User';
  const defaultAvatar = 'https://avatar.iran.liara.run/public'; // Replace with your default image URL
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [username, setUsername] = useState(defaulltUser);

  // Fetch avatar and username because its cool 😎
  useEffect(() => {
    const fetchAvatar = async () => {
      const avatarUrl = await getUserAvatar();
      const userName = await getUsername();
      if (avatarUrl) {
        setAvatar(avatarUrl);
      }
      if (userName) {
        setUsername(userName);
      }
    };

    fetchAvatar();
  }, []);


  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="bg-gray-800 h-full">
        <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
          <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
            <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
            />
          </TouchableOpacity>
          <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
            <Image
              source={{ uri: avatar }}
              className="w-[90%] h-[90%] rounded-lg"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white text-2xl font-bold mt-4">{username}</Text>
        </View>
        
    </SafeAreaView>
  );
};

export default Profile;