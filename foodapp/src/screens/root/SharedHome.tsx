import React from 'react';
import { View, Text, Image, LogBox, ScrollView } from 'react-native';
import SpeedSlider from '../../components/SliderComp';
import Clock from '../../components/Clock';
import Quote from '../../components/Quote';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const SharedScreen = ({ route }: any) => {
    const { speed, startTime, endTime } = route.params;
    return (
        <View className="flex-1 bg-white relative">
            <Image
                className={`w-full h-full absolute`}
                source={require('../../assets/bg-image.png')}
                resizeMode="cover"
            />
            <View className="w-full h-full absolute bg-black/60 "></View>
            <ScrollView>
                <Clock
                    speed={speed}
                    startTime={startTime}
                    endDuration={endTime}
                />
                <View className=" mt-auto w-full min-h-[60vh] bg-white p-6 px-8 pt-0 rounded-t-3xl">
                    <View className='w-[58px] mx-auto bg-black/20 h-1 rounded-full mt-2 mb-6'></View>
                    <SpeedSlider
                        speed={speed}
                        setSpeed={(val: number) => console.log(val)}
                    />
                    {/* <Text className='text-heading text-xs mb-4'>
                        * I am unable to send another user the URL so they can see the slider and the clock on the same page in the exact same configuration as when the share button was pressed. I don't have my app URL link. So I implemented this feature on a different screen when the share button is pressed.
                    </Text> */}
                    <Quote />
                </View>
            </ScrollView>
        </View>
    );
};

export default SharedScreen;
