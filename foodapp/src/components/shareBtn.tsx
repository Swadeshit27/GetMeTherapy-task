import React, { useEffect, useState } from 'react';
import { Share, View, Button, Alert, Linking } from 'react-native';


const useInitialURL = () => {
    const [url, setUrl] = useState<string | null>(null);
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
        const getUrlAsync = async () => {
            // Get the deep link used to open the app
            const initialUrl = await Linking.getInitialURL();
            console.log('initialUrl', initialUrl);
            // The setTimeout is just for testing purpose
            setTimeout(() => {
                setUrl(initialUrl);
                setProcessing(false);
            }, 1000);
        };

        getUrlAsync();
    }, []);

    return { url, processing };
};

const ShareExample = () => {
    const { url: initialUrl } = useInitialURL();
    console.log('initialUrl', initialUrl);
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React' +
                    initialUrl 
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };
    return (
        <View>
            <Button onPress={onShare} title="Share" />
        </View>
    );
};

export default ShareExample;