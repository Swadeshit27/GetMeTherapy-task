import { ActivityIndicator, View } from 'react-native'
import React from 'react'

const Loader = () => {
    return (
        <>
            <View className='flex-1 items-center justify-center w-full h-full bg-white'>
                <ActivityIndicator size="large" animating color={"#FE8C00"} />
            </View>
        </>
    )
}

export default Loader 