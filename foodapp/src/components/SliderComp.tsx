import React, { FC } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

type SpeedSliderProps = {
    speed: number;
    setSpeed: (val: number) => void;
};

const SpeedSlider:FC<SpeedSliderProps> = ({ speed, setSpeed }) => {
    return (
        <View className='w- mx-auto mb-4'>
            <Text className='text-heading font-inter_500 text-center mb-4'>Control the speed of clock hands</Text>
            {/* <Text className='text-heading font-inter_500'>Speed: {speed.toFixed(1)}</Text> */}
            <Slider
                minimumTrackTintColor="#FE8C00"
                maximumTrackTintColor="#FE8C006a"
                thumbTintColor="#FE8C00"
                minimumValue={1}
                maximumValue={10}
                step={0.1}
                value={speed} 
                onValueChange={value => setSpeed(value)}
            />
        </View>
    );
};

export default SpeedSlider;
