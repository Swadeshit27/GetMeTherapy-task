import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'

const LoginSuccessful = ({ navigation }: { navigation: screenNavigation }) => {
    return (
        <View className="flex-1 w-full h-full relative">
            <Image
                className={`w-full h-full absolute`}
                source={require('../../assets/bg-image.png')}
                resizeMode="cover"
            />
            <View className='w-full h-[60vh] bg-white mt-auto rounded-t-3xl px-8'>
                <View className='w-[58px] mx-auto bg-black/20 h-1 rounded-full mt-2'></View>
                <Image
                    source={require('../../assets/Success.png')}
                    width={200}
                    height={168}
                    className='mx-auto mt-10'
                />
                <Text className='text-2xl font-inter_600 text-heading text-center mt-6'>Login Successful</Text>
                <TouchableOpacity
                    className='bg-main w-full py-4 rounded-full mt-6'
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text className='text-white text-center text-sm font-inter_600'>Go to Tracking Screen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={async () => (await auth().signOut(), navigation.navigate('OuterScreen'))}
                >
                    <Text className='text-sm text-para1 text-center mt-6 font-inter_500'>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginSuccessful 