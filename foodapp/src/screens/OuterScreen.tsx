import React, { useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome6';
import auth from "@react-native-firebase/auth"

const slides = [
    {
        title: 'We serve incomparable delicacies',
        description:
            'All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!',
        imgSrc: require('../assets/bg-image.png'),
    },
    {
        title: 'We serve incomparable delicacies 2',
        description:
            'All the best restaurants with their top menu waiting for you, they cant’t wait for your order!! 2',
        imgSrc: require('../assets/bg-img2.png'),
    },
    {
        title: 'We serve incomparable delicacies 3',
        description:
            'All the best restaurants with their top menu waiting for you, they cant’t wait for your order!! 3',
        imgSrc: require('../assets/bg-image.png'),
    },
];

const OuterScreen = ({ navigation }: { navigation: screenNavigation }) => {
    const [index, setIndex] = useState(0); 

    const navigateScreen = () => {
        const user = auth().currentUser;
        if (user) navigation.navigate('Home');
        else navigation.navigate('Login');
    }

    return (
        <>
            <View className="flex-1 w-full h-full relative">
                {slides.map((item, i) => (
                    <Image
                        key={i}
                        className={`w-full h-full absolute ${index === slides.indexOf(item) ? 'block' : 'hidden'
                            }`}
                        source={item.imgSrc}
                        resizeMode="cover"
                    />
                ))}
                <View className="w-[311px] h-[400px] bg-main rounded-[48px] mx-auto mt-auto mb-9 p-6">
                    <View className="">
                        {slides.map((slide, i) => (
                            <View
                                key={i}
                                className={`${index === i ? 'flex' : 'hidden'
                                    } flex-col items-center`}>
                                <Text className="text-white text-center text-[30px] leading-[36px] font-inter_600 mb-4">
                                    {slide.title}
                                </Text>
                                <Text className="text-center text-sm font-inter_400 text-white">
                                    {slide.description}
                                </Text>
                            </View>
                        ))}
                        <View className="flex flex-row justify-center gap-x-2 mt-6">
                            {[0, 1, 2].map(item => (
                                <View
                                    key={item}
                                    className={`w-6 h-1.5 ${item === index ? 'bg-white' : 'bg-[#C2C2C2]'} rounded-full`}
                                >
                                </View>
                            ))}
                        </View>
                    </View>
                    {index !== slides.length - 1 ? (
                        <View className="flex items-center justify-between flex-row mt-auto ">
                            <Pressable
                                onPress={navigateScreen}
                                className="z-[999]"
                            >
                                <Text className="text-white text-sm font-inter_400">Skip</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setIndex(index + 1)}
                                className="flex flex-row items-center gap-x-2">
                                <Text className="text-white text-sm font-inter_400">Next</Text>
                                <Icon name={'arrow-right-long'} size={16} color={'#fff'} />
                            </Pressable>
                        </View>
                    ) : (
                        <View className="flex items-center justify-center flex-row  mt-6">
                            <TouchableOpacity
                                className="relative flex items-center justify-center  rounded-full"
                                onPress={navigateScreen}>
                                <View className="absolute w-[62px] h-[62px] rounded-full bg-white flex items-center justify-center">
                                    <Icon name="arrow-right" size={18} color={'#FE8C00'} />
                                </View>
                                <Svg width="94" height="94" viewBox="0 0 36 36">
                                    <Circle
                                        cx="18"
                                        cy="18"
                                        r="16"
                                        fill="none"
                                        strokeWidth="1"
                                        stroke="#FE9514"
                                    />
                                    <G rotation="-90" origin="18, 18">
                                        <Circle
                                            cx="18"
                                            cy="18"
                                            r="16"
                                            fill="none"
                                            strokeWidth="1"
                                            stroke="#FFFFFF"
                                            strokeDasharray="150"
                                            strokeDashoffset="75"
                                        />
                                    </G>
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View >
        </>
    );
};

export default OuterScreen;
