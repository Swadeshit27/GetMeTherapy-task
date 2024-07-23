import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CommonCss } from '../../utils/commonCssClass';
import auth from '@react-native-firebase/auth';
import Loader from '../../components/Loader';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const validate = Yup.object({
  email: Yup.string()
    .email('Provide a valid email')
    .required('Email is required'),
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required')
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  //   'Password must contain at least one uppercase,lowercase letter, number, special character and min 6 characters',
  // ),
});

const Register = ({ navigation }: { navigation: screenNavigation }) => {
  const [isPassView, setIsPassView] = useState(true);
  const [accepted, setIsAccepted] = useState(true);
  const [loading, setLoading] = useState(false);

  const RegisterUser = async (values: userType) => {
    try {
      setLoading(true);
      values.isPolicyAccepted = accepted;
      const { email, username, password } = values; 
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert(
        'Success ✅',
        'Registration successful! Please login to continue',
      );
      navigation.navigate('Home');
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
      // Alert.alert("Success ✅", `Registration successful!`);
      navigation.navigate("Home")
    } catch (error: any) {
      console.log(error);
      Alert.alert('Error ❌', error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="p-8">
          <View className="mb-8">
            <Text className="text-h1 text-heading leading-lead1 mb-2 max-w-[300px] font-inter_600 ">
              Create your new account
            </Text>
            <Text className="text-sm text-para1 font-inter_400">
              Create an account to start looking for the food you like
            </Text>
          </View>
          <View>
            <Formik
              initialValues={{
                email: '',
                password: '',
                username: '',
                isPolicyAccepted: false,
              }}
              onSubmit={RegisterUser}
              validationSchema={validate}>
              {({ handleChange, handleSubmit, values, touched, errors }) => (
                <View>
                  <View className="mb-4">
                    <Text className={CommonCss.label}>Email Address</Text>
                    <TextInput
                      placeholder="Enter Email"
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
                  <View className="mb-4">
                    <Text className={CommonCss.label}>User Name</Text>
                    <TextInput
                      placeholder="Enter username"
                      className={CommonCss.input}
                      onChangeText={handleChange('username')}
                      value={values.username}
                    />
                    {touched.username && errors.username && (
                      <Text className="text-xs text-red-500 mt-1">
                        {errors.username}
                      </Text>
                    )}
                  </View>
                  <View className="relative mb-3">
                    <Text className={CommonCss.label}>Password</Text>
                    <TextInput
                      placeholder="********"
                      secureTextEntry={isPassView}
                      onChangeText={handleChange('password')}
                      value={values.password}
                      className={CommonCss.input}
                    />
                    {touched.password && errors.password && (
                      <Text className="text-xs text-red-500 mt-1">
                        {errors.password}
                      </Text>
                    )}
                    <Pressable
                      className="absolute top-10 right-5"
                      onPress={() => setIsPassView(!isPassView)}>
                      {!isPassView ? (
                        <Icon name={'eye'} size={20} color={'#878787'} />
                      ) : (
                        <Icon name={'eye-slash'} size={20} color={'#878787'} />
                      )}
                    </Pressable>
                  </View>
                  <View className="flex items-start flex-row gap-x-3">
                    <Pressable
                      onPress={() => setIsAccepted(!accepted)}
                      className={`w-5 h-5 border-main border rounded-[4px] flex items-center justify-center ${accepted && 'bg-main'
                        }`}>
                      {accepted && (
                        <Icon name={'check'} size={10} color={'#ffffff'} />
                      )}
                    </Pressable>
                    <Text className="text-heading font-inter_500 text-sm w-72 ">
                      I Agree with{' '}
                      <Text className="text-main">Terms of Service</Text> and{' '}
                      <Text className="text-main">Privacy Policy </Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    className={`${accepted ? "bg-main" : "bg-orange-200"} w-full py-4 rounded-full mt-6`}
                    disabled={!accepted}
                  >
                    <Text className="text-white text-center text-sm font-inter_600">
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View className="flex flex-row items-center justify-between my-6">
              <View className="border-b border-border_1 w-[30%] "></View>
              <Text className="text-center text-para1 font-inter_400  ">
                Or Sign in with
              </Text>
              <View className="border-b border-border_1 w-[30%] "></View>
            </View>
            <View className="flex flex-row items-center justify-center mb-6">
              <TouchableOpacity
                onPress={loginWithGoogle}
                className="w-14 h-14 bg-white border border-border_2 rounded-full flex items-center justify-center ">
                <Image
                  source={require('../../assets/google.png')}
                  className="w-8 h-8 object-contain"
                />
              </TouchableOpacity>
            </View>
            <View className="flex items-center justify-center">
              <Text className="text-heading text-center font-inter_500">
                Have an account?{' '}
                <Text
                  className="text-main "
                  onPress={() => navigation.navigate('Login')}>
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
