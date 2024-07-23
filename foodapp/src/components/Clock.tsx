import React, { useState, useEffect, FC } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { CommonCss } from '../utils/commonCssClass';


type props = {
    speed: number;
    timeDetails?: (val: Date, time: Date) => void;
    startTime?: Date;
    endDuration?: Date;
}

const Clock: FC<props> = ({
    speed = 1,
    timeDetails,
    startTime = new Date(),
    endDuration = new Date(new Date().getTime() - 120 * 60 * 1000)
}) => { 
    const [time, setTime] = useState(startTime);
    const [endTime, setEndTime] = useState(endDuration);

    useEffect(() => {
        if (time.getTime() > endTime.getTime()) {
            const timerId = setInterval(() => {
                setTime(prevTime => new Date(prevTime.getTime() - speed * 1000));
                if (timeDetails) timeDetails(time, endTime);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            Alert.alert('⏳ Time is up!');
        }
    }, [time, endTime]);

   

    return (
        <>
            
            <View className="relative w-52 h-52 rounded-full shadow-lg shadow-indigo-100 bg-white  mx-auto mt-10 ">
                <View className="absolute top-[47%] left-[47%] transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-500 rounded-full border border-white z-[99999]" />
                <View
                    className="absolute w-1.5 h-[60px] left-[49.5%] top-[22%] bg-gray-900 origin-bottom"
                    style={{
                        transform: [{ rotateZ: `${time.getHours() * 30}deg` }],
                        // transform: [{ rotateZ: `${time.getMinutes()/2}deg` }],
                        transformOrigin: 'bottom',
                    }}
                />
                <View
                    className="absolute w-1 left-[50%] top-[15%] h-[74px] bg-gray-700"
                    style={{
                        transform: [{ rotateZ: `${time.getMinutes() * 6}deg` }],
                        transformOrigin: 'bottom',
                    }}
                />
                <View
                    className="absolute w-0.5 h-24 left-[50.5%] top-[4.5%]  bg-red-600 origin-bottom"
                    style={{
                        transform: [{ rotateZ: `${time.getSeconds() * 6}deg` }],
                        transformOrigin: 'bottom',
                    }}
                />
                <Text className={`${CommonCss.clock_num} text-main absolute left-[47%] top-1`}>
                    12
                </Text>
                <Text className={`${CommonCss.clock_num} text-main absolute top-[46%] right-1`}>
                    3
                </Text>
                <Text className={`${CommonCss.clock_num} text-main absolute bottom-0.5 left-[49%]`} >
                    6
                </Text>
                <Text className={`${CommonCss.clock_num} text-main absolute top-[46%] left-1.5`} >
                    9
                </Text>
                <Text className={`${CommonCss.clock_num} absolute top-[7.5%] right-[25%]`}>
                    1
                </Text>
                <Text className={`${CommonCss.clock_num} absolute top-[7.5%] left-[25%]`}>
                    11
                </Text>
                <Text className={`${CommonCss.clock_num} absolute top-[23.5%] right-[8%]`}>
                    2
                </Text>
                <Text className={`${CommonCss.clock_num} absolute top-[24%] left-[8.5%]`} >
                    10
                </Text>
                <Text className={`${CommonCss.clock_num} absolute top-[67.5%] right-[9%]`} >
                    4
                </Text>
                <Text className={`${CommonCss.clock_num} absolute top-[68%] left-[9%]`}>
                    8
                </Text>
                <Text className={`${CommonCss.clock_num} absolute bottom-[6.5%] right-[25%]`}>
                    5
                </Text>
                <Text className={`${CommonCss.clock_num} absolute bottom-[6%] left-[26.5%]`}>
                    7
                </Text>
            </View>
            <View className='mb-3'>
                <Text className='text-center text-white font-inter_500 mt-5 text-xl'>
                    Welcome 🙏
                </Text>
                <Text className='text-center text-white font-inter_500 mt-2 text-sm'>
                    {time.toLocaleTimeString()}
                </Text> 
            </View>
        </>
    );
};

export default Clock;
