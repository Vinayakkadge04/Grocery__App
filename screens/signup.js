import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import { URL } from '../utils/constants';
import { Controller, useForm } from 'react-hook-form';
export default function Signup(props) {




  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm()


  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState();
  const [password, setpassword] = useState("");
  const [secureText , setSecureText] = useState(true);

  const signUpAPI = async () => {
    try {
      console.log(name, email, phone, password);
      const url = URL + "/customer/";
      const result = await axios.post(url, {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        customerPassword: password
      },
      );

      if (result.status === 201) {
        console.log('helloi')
        Alert.alert("You registered Successfully")
        props.navigation.navigate('Login')
      }


    } catch (error) {
      Alert.alert("Something went wrong...Please Try Again")
      console.log(JSON.stringify(error, null, 2));
      console.log(error?.response?.data?.message || error.message);
    }
  }

  return (
    <View style={style.container}>
      <ImageBackground style={style.image} source={require('../assets/signup.png')}>
        <View style={style.header}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
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
            <Text style={style.title}>Create Account</Text>
          </View>
          <View>
            <Text style={[style.para, { paddingBottom: 20 }]}>Quickly create account</Text>
          </View>


          <View style={[style.textBox, { justifyContent: 'start' }]}>
            <Ionicons name='person-outline' size={25} color={'#868889'} />
            <TextInput onChangeText={(text) => setname(text)}
              placeholder='Name' style={{ fontSize: 15, marginLeft: 12 }} />
          </View>

          {/* <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
            }) => (
              <TextInput
               placeholder='Name'
              style={style.textBox}
                autoCapitalize="none"
                onChangeText={(text) => setname(text)}
                // onBlur={onBlur}
                // value={value}
                color='black'
              />
            )}
            name="firstname"
            rules={{
              required: 'Firstname is required',
            }}
          /> */}

          <View style={[style.textBox, { justifyContent: 'start' }]}>
            <Ionicons name='mail-outline' size={28} color={'#868889'} />
            <TextInput onChangeText={(text) => setemail(text)}
              placeholder='Email' style={{ fontSize: 15, marginLeft: 12 }} />
          </View>

          <View style={[style.textBox, { justifyContent: 'start' }]}>
            <Ionicons name='call-outline' size={28} color={'#868889'} />
            <TextInput onChangeText={(text) => setphone(text)}
              placeholder='Phone' style={{ fontSize: 15, marginLeft: 12 }} />
          </View>

          <View style={style.textBox}>
            <View style={{ flex: 1, flexDirection: 'row',alignItems:'center' }}>
              <Ionicons name='lock-closed-outline' size={28} color={'#868889'} />
              <TextInput onChangeText={(text) => setpassword(text)}
                placeholder='Password' secureTextEntry={secureText} style={{ fontSize: 15, marginLeft: 12 }} />
            </View>
            <TouchableOpacity onPress={() => {setSecureText(!secureText)}}>
            <Ionicons name={secureText ? 'eye-off-outline' : 'eye-outline'} size={24} color={'#868889'}/>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => {
            console.log('Hi');
            signUpAPI();
          }
          }>
            <View style={style.butn}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Signup</Text>
            </View>
          </TouchableOpacity>
          <View style={style.richtext}>
            <Text style={{ color: 'grey', fontSize: 18 }}>Already have an account ?</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>Login</Text>
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
    borderRadius: 12
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
    marginTop: 20
  },
  richtext: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  }
});