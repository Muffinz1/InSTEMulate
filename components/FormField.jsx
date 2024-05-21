import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";


const FormField = ({ title, value, placeholder, handleChangeText, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (    
    <View className='space-y-2 mb-5'>
      <Text className="text-white text-base">{title}</Text>
      <View className=" w-full h-16 bg-zinc-700 px-4 py-2 border-2
       border-red-300 rounded-2xl focus:border-secondary-200 items-center flex-row">
        <TextInput className="w-full h-full text-white text-psemibold text-xl flex-1"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#8D8D8D"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>      
    </View>
  );
}


export default FormField;