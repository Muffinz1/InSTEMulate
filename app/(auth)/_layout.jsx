import { Stack } from 'expo-router';
import { Redirect } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';

const AuthLayout = () => {

  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/quiz" />;
  return (
    <>
      <Stack>
        <Stack.Screen name='sign-in'
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen name='sign-up'
        options={{
          headerShown: false
        }}
        />
      </Stack>
    </>
  )
}