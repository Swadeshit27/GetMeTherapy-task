import { Pressable, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Quote = () => {
    const [quote, setQuote] = useState<quoteType>({
        quote: 'Part of the happiness of life consists not in fighting battles, but in avoiding them. A masterly retreat is in itself a victory.',
        author: 'Norman Vincent Peale'
    });
    const [start, setStart] = useState<boolean>(false);

    const getQuote = async () => {
        try {
            const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
                headers: {
                    'X-Api-Key': 'api key',
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });
            const data = await response.json();
            setQuote(data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (start) {
            const interval = setInterval(() => {
                getQuote();
            }, 5000);
            return () => clearInterval(interval);
        }
        else getQuote()
    }, [start]);

    return (
        <>
            <View
                className={
                    quote
                        ? `w-full mt-8  bg-main rounded-xl  p-6  h-auto transition-all ease-linear duration-500 `
                        : 'h-0 p-0  transition-all ease-linear duration-500'
                }>
                <Text className="text-sm text-white font-inter_500 text-center">
                    {quote.quote.length > 200 ? quote.quote.slice(0, 180) + "..." : quote.quote}
                </Text>
                <View className="flex justify-end flex-row mt-3 items-center">
                    <Text className="text-white opacity-85 capitalize">
                        ~ {quote?.author}
                    </Text>
                </View>
            </View>
            <View className="mt-4">
                <Pressable
                    className="w-56 mx-auto bg-blue-500 py-3 rounded-full z-[99999] "
                    onPress={() => setStart(!start)}>
                    <Text className="text-white text-center font-inter_500">
                        {start ? 'Stop' : 'Start'} Getting quote
                    </Text>
                </Pressable>
            </View>
        </>
    )
}

export default Quote 