import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  ActivityIndicator
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { login } from '../component/redux/Authslice';
import { URL } from '../utils/constants';
import { useForm, Controller } from 'react-hook-form';
export default function LoginScreen(props) {

  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailError, setemailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [secureText , setSecureText] = useState(true);
  const [isloadding , setisloadding] = useState(false);
  const loginAPI = async () => {

    !email ? setemailError(true) : setemailError(false) ;
    !password ? setpasswordError(true) : setpasswordError(false);
   
    try {
      setisloadding(true);
      const url = URL+"/customer/login";
      const result = await axios.post(url, {
        customerEmail:email,
        customerPassword:password
      });
      
      
      if (result.status === 200) {
    
        console.log(result.data.token)
        console.log(result.data.customer)
        dispatch(login({token:result.data.token,info:result.data.customer}));
        props.navigation.navigate('Main')
      }
      setisloadding(false)
    } catch (error) {
      setisloadding(false)
      Alert.alert("Login failed")
      console.log(JSON.stringify(error, null,2,"Erron In1"));
      console.log(error?.response?.data?.message || error.message,"error In 2");
    }
  }

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={style.container}>
      <ImageBackground style={style.image} source={require('../assets/login.png')}>
        <View style={style.header}>
          <TouchableOpacity onPress={() => props.navigation.navigate('welcome')}>
            <Ionicons name='arrow-back-outline' size={30} color={'white'} />
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{
              fontSize: 22,
              fontWeight: '600',
              color: 'white',
            }}>Welcome</Text>
          </View>
        </View>
        <View style={style.bottomcontainer}>
          <View>
            <Text style={style.title}>Welcome Back!</Text>
          </View>
          <View>
            <Text style={[style.para, { paddingBottom: 20 }]}>Sign in to your account</Text>
          </View>
          <View>
            <View style={[style.textBox, { justifyContent: 'start' }]}>
              <Ionicons name='mail-outline' size={28} color={'#868889'} />
              <TextInput onChangeText={(text) => setemail(text)}
                placeholder='Email Address' style={{ fontSize: 17, marginLeft: 12 ,flex:1}}/>
            </View>
            {
              emailError ? <Text style={style.errormsg}>Enter your email</Text> : null
            }
          </View>
          <View style={style.textBox}>
            <View style={{ flex: 1, flexDirection: 'row' ,alignItems:'center'}}>
              <Ionicons name='lock-closed-outline' size={28} color={'#868889'} />
              <TextInput onChangeText={(text) => setpassword(text)}
                placeholder='Password' secureTextEntry={secureText} style={{ fontSize: 17, marginLeft: 12 , flex:1}} />
            </View>
            <TouchableOpacity onPress={() => {setSecureText(!secureText)}}>
            <Ionicons name={secureText ? 'eye-off-outline' : 'eye-outline'} size={24} color={'#868889'}/>
            </TouchableOpacity>
            
          </View>
          {
            passwordError ?<Text style={style.errormsg}>Enter your password</Text> :  null 
          }
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              {/* <Switch
                style={{ transform: [{ scaleX: .8 }, { scaleY: .7 }] }}
                trackColor={{ false: "#fffff", true: "#6CC51D" }}
                onValueChange={toggleSwitch}
                value={isEnabled} />
              <Text>Remember me</Text> */}
            </View>
            <TouchableOpacity onPress={() => props.navigation.navigate('forgot')}>
              <Text style={{ color: '#407EC7' }}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={() => {
            loginAPI();
            console.log(email, password);
           
          }}>
            <View style={style.butn}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Login</Text>
            </View>
          </TouchableOpacity> */}


          {isloadding ? (
            <ActivityIndicator size="large" color="#6CC51D" style={{ marginTop: 20 }} />
          ) : (
            <TouchableOpacity onPress={() => {
              loginAPI();
              console.log(email, password);
            }}>
              <View style={style.butn}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Login</Text>
              </View>
            </TouchableOpacity>
          )}


          <View style={style.richtext}>
            <Text style={{ color: 'grey', fontSize: 18 }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('signup')}>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  image: {
    flex: 1,
    justifyContent: 'center',

  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 60,
    justifyContent: 'center'
  },
  bottomcontainer: {
    backgroundColor: '#F4F5F9',
    padding: 20,
    borderTopLeftRadius:12,
    borderTopRightRadius:12
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: '700'
  },
  para: {
    color: '#868889',
    fontSize: 18
  },
  textBox: {
    backgroundColor: 'white',
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.2,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4
  },
  butn: {
    backgroundColor: "#6CC51D",
    padding: 17,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.2,
    marginTop: 10
  },
  richtext: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  errormsg: {
    color: 'red',

  }
});