import { ScrollView, SafeAreaView, Text, View, Image } from 'react-native'
import React from 'react'
import { images } from '../../constants'
import { CustomButton, FormField } from '../../components'
import { useState } from 'react'
import { Link } from 'expo-router'

const SignUp = () => {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = () => {

  }

  return (
    <>
      <SafeAreaView className="bg-zinc-800 h-full">
        <ScrollView>
          <View className="w-full justify-center min-h[85vh] px-4 my-5">
            <Image
            source={images.ilogo}
            className="w-48 h-44  mx-auto "
            resizeMode='contain'
            />
            <Text className="text-2xl font-psemibold text-white my-4 mt-8">
              Sign Up to inSTEMulate
            </Text>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, usernamer: e })}
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
            />
            <CustomButton
            title="Sign Up"
            handlePress={submit}
            isLoading={isSubmitting}
            />
            <View className="flex-row justify-center mt-4 pt-5 gap-2">
              <Text className="text-white text-lg font-pregular">Already have an account?</Text>
              <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign In</Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default SignUp
