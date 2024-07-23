import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Clock from '../../components/Clock';
import SpeedSlider from '../../components/SliderComp';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Quote from '../../components/Quote';
import Material from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

const Home = ({ navigation }: { navigation: screenNavigation }) => {
  const [speed, setSpeed] = useState<number>(1);
  const [time, setTime] = useState({
    startTime: new Date(),
    endTime: new Date(),
  });

  const logoutUser = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          await auth().signOut();
          Alert.alert('Logout', 'logged out successfully!');
        },
      },
    ]);
  };

  const handleShare = () => {
    const { startTime, endTime } = time; 
    const uniqueURL = `yourapp://clock?speed=${speed}?startTime=${startTime}?endTime=${endTime}`; 
    navigation.navigate('SharedScreen', { speed, startTime, endTime });
  };

  return (
    <View className="flex-1 bg-white relative">
      <Image
        className={`w-full h-full absolute`}
        source={require('../../assets/bg-image.png')}
        resizeMode="cover"
      />
      <View className="w-full h-full absolute bg-black/60 "></View>
      <ScrollView>
        <TouchableOpacity
          onPress={logoutUser}
          className="absolute right-4 top-4"
        >
          <Material name='logout' color={'red'} size={28} />
        </TouchableOpacity>

        <Clock
          speed={speed}
          timeDetails={(startTime, endTime) => setTime({ startTime, endTime })}
        />
        <View className=" mt-auto w-full min-h-[60vh] bg-white px-8 py-4 pt-0 rounded-t-3xl">
          <View className="w-[58px] mx-auto bg-black/20 h-1 rounded-full mt-3 mb-4"></View>
          <SpeedSlider speed={speed} setSpeed={(val: number) => setSpeed(val)} />
          <TouchableOpacity
            onPress={handleShare}
            className="w-1/2 bg-blue-500 rounded-md py-2 flex items-center flex-row justify-center gap-x-2 mx-auto mt-2">
            <Icon name="share-from-square" color={'#ffffff'} size={16} />
            <Text className="text-sm font-inter_500 text-white">Share Now</Text>
          </TouchableOpacity>
          <Quote />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
