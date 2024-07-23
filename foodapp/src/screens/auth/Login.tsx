import { Alert, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CommonCss } from '../../utils/commonCssClass';
import auth from "@react-native-firebase/auth"
import Loader from '../../components/Loader';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const validate = Yup.object({
    email: Yup.string()
        .email('Provide a valid email')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
    // .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    //     'Password must contain at least one uppercase,lowercase letter, number, special character and min 6 characters',
    // ),
});

const Login = ({ navigation }: { navigation: screenNavigation }) => {
    const [isPassView, setIsPassView] = useState(false);
    const [loading, setLoading] = useState(false);

    const loginUser = async (values: userType) => {
        try {
            setLoading(true);
            const { email, password } = values;
            await auth().signInWithEmailAndPassword(email, password);
            Alert.alert("Success ✅", `Welcome back!`);
            navigation.navigate("LoginSuccessful")
        } catch (error: any) {
            console.log(error);
            Alert.alert('Error ❌', error.message);
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        try {
            setLoading(true);
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            // Alert.alert("Success ✅", `Welcome back!`);
            navigation.navigate("LoginSuccessful")
        } catch (error: any) {
            console.log(error);
            Alert.alert('Error ❌', error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loader />
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ScrollView>
                <View className='px-8 py-10'>
                    <View className='mb-12'>
                        <Text className='text-h1 text-heading leading-lead1 mb-2 max-w-[300px] font-inter_600'>Login to your account.</Text>
                        <Text className='text-sm text-para1 font-inter_400'>Please sign in to your account </Text>
                    </View>
                    <View>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={loginUser}
                            validationSchema={validate}
                        >
                            {({ handleChange, handleSubmit, values, touched, errors }) => (
                                <View>
                                    <View className='mb-4'>
                                        <Text className={CommonCss.label}>Email Address</Text>
                                        <TextInput
                                            placeholder='Enter Email'
                                            className={CommonCss.input}
                                            onChangeText={handleChange('email')}
                                            value={values.email}
                                        />
                                        {touched.email && errors.email && (
                                            <Text className="text-xs text-red-500 mt-1">
                                                {errors.email}
                                            </Text>
                                        )}
                                    </View>
                                    <View className='relative mb-2.5'>
                                        <Text className={CommonCss.label}>Password</Text>
                                        <TextInput
                                            placeholder='********'
                                            secureTextEntry={isPassView}
                                            onChangeText={handleChange('password')}
                                            value={values.password}
                                            className={CommonCss.input}
                                        />
                                        {touched.password && errors.password && (
                                            <Text className='text-xs text-red-500 mt-1'>
                                                {errors.password}
                                            </Text>
                                        )}
                                        <Pressable
                                            className='absolute top-10 right-5'
                                            onPress={() => setIsPassView(!isPassView)}
                                        >
                                            {!isPassView ? (
                                                <Icon name={'eye'} size={20} color={'#878787'} />
                                            ) : (
                                                <Icon name={'eye-slash'} size={20} color={'#878787'} />
                                            )}
                                        </Pressable>
                                    </View>
                                    <View className='flex items-center justify-end flex-row'>
                                        <Text className="text-main text-sm font-inter_500">
                                            Forget Password ?
                                        </Text>
                                    </View>
                                    <Pressable
                                        onPress={() => handleSubmit()}
                                        className='bg-main w-full py-4 rounded-full mt-6'
                                    >
                                        <Text className='text-white text-center text-sm font-inter_600'>Sign In</Text>
                                    </Pressable>
                                </View>
                            )}
                        </Formik>
                        <View className='flex flex-row items-center justify-between my-6'>
                            <View className='border-b border-border_1 w-[30%] '></View>
                            <Text className='text-center text-para1 font-inter_400  '>Or Sign in with</Text>
                            <View className='border-b border-border_1 w-[30%]'></View>
                        </View>
                        <View className='flex flex-row items-center justify-center mb-6'>
                            <TouchableOpacity
                                onPress={loginWithGoogle}
                                className='w-14 h-14 bg-white border border-border_2 rounded-full flex items-center justify-center '>
                                <Image
                                    source={require('../../assets/google.png')}
                                    className='w-8 h-8 object-contain'
                                />
                            </TouchableOpacity>
                        </View>
                        <View className='flex items-center justify-center'>
                            <Text className='text-heading text-center font-inter_500'>Don't have an account?{" "}
                                <Text className='text-main'
                                    onPress={() => navigation.navigate('Register')}
                                >Register</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login 