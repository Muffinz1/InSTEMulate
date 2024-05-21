import { Link } from 'expo-router';
import React from 'react';
import { Text, View, ActivityIndicator, SafeAreaView } from 'react-native';

const Learn = () => {
  return (
    <SafeAreaView className='justify-center items-center h-full bg-'>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text className='mt-4 text-3xl font-psemibold text-center'>Coming Soon. Please explore our
       <Link href='quiz'>
        <Text className='text-blue-500'> Quizzes 😉 </Text>
       </Link>
      </Text>
    </SafeAreaView>
    );
};

export default Learn;