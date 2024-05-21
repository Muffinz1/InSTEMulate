import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useGlobalContext } from "../../context/GlobalProvider";
import { useNavigation } from '@react-navigation/native';
import QuestionScreen from '../question-page';


const Quiz = ({route}) => {
    const navigation = useNavigation();
    // categories with id since the API requires an id to fetch questions
    const categories = [
    { name: 'Maths', id: 19},
    { name: 'Sports', id: 21 },
    { name: 'Geography', id: 22 },
    { name: 'History', id: 23 },
    { name: 'Politics', id: 24 },
  ];
  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'Good Morning⛅' : currentTime < 18 ? 'Good Afternoon☀️' : 'Good Evening🌃';


  const handleCategorySelect = (category) => {
    navigation.push('question-page', { id: category.id });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      className="bg-blue-300 rounded-xl min-h-[62px] w-full flex flex-row justify-center items-center mt-4" 
      onPress={() => handleCategorySelect(item)}>
      <Text className="text-lg font-psemibold">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1F2937' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
        <Text className='text-2xl text-cyan-100 mt-4'>{greeting}</Text>
        <Text style={{ fontSize: 20, fontWeight: '600', color: '#FFFFFF', marginBottom: 26, marginTop: 48 }}>
          Select A Category to Continue
        </Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id.toString()}
        />
        <Text className="text-center font-pregular text-sm text-cyan-300 mb-32">
          You do not get a feedback for answers. Only scores are returned. A correct answer is worth a point. No penalty for wrong answers.
        </Text>
      </View>
      <Text className="text-white  text-center mb-2">
        (c) 2024 inSTEMulate. All Rights Reserved.
      </Text>
    </SafeAreaView>
  );
};

export default Quiz;