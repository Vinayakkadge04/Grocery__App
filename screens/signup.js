import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import { URL } from '../utils/constants';
import { Controller, useForm } from 'react-hook-form';
export default function Signup(props) {


  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const [secureText , setSecureText] = useState(true);
  const [isloading , setisloading ] = useState(false)
  const signUpAPI = async (data) => {
    try {
      setisloading(true)
      const url = URL + "/customer/";
      const result = await axios.post(url, 
        {
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        customerPassword: data.password
      });
      console.log(result)
      if (result.status === 201) {
       
        Alert.alert("You registered Successfully")
        props.navigation.navigate('Login')
      }

      setisloading(false)
    } 
   
    catch (error) {
      console.log(

      )
      setisloading(false)
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
            <Controller
              name='name'
              control={control}
              render={({field:{onChange , onBlur , value}})=>(
                <TextInput
                //  onChangeText={(text) => setname(text)}
                placeholder='Name' style={{ fontSize: 17, marginLeft: 12 ,flex:1}} 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                />
              )}
              rules={{required:true}}
            />
           
          </View>

            {
              errors.name && <Text style={style.errmsg}>Name is required</Text>
            }

          <View style={[style.textBox, { justifyContent: 'start' }]}>
            <Ionicons name='mail-outline' size={28} color={'#868889'} />
            <Controller
              control={control}
              name='email'
              render={({field:{onChange, onBlur , value}})=>(
                <TextInput 
                // onChangeText={(text) => setemail(text)}
                placeholder='Email' style={{ fontSize: 17, marginLeft: 12,flex:1 }} 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              )}
              rules={{required: true , pattern: /\S+@\S+\.\S+/}}
            />
          </View>
          {
            errors.email && <Text style={style.errmsg}>Please Enter Valid Email</Text>
          }

          <View style={[style.textBox, { justifyContent: 'start' }]}>
            <Ionicons name='call-outline' size={28} color={'#868889'} />
            <Controller
              control={control}
              name='phone'
              render={({field:{onChange , onBlur , value}})=>(
                <TextInput 
                // onChangeText={(text) => setphone(text)}
              placeholder='Phone' style={{ fontSize: 17, marginLeft: 12 ,flex:1}} 
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              />
              )}
              rules={{required: true, pattern: /^\d{10}$/ }}
            />

          </View>
          {
            errors.phone && <Text style={style.errmsg}> Enter Valid Phone </Text>
          }

          <View style={style.textBox}>
            <View style={{ flex: 1, flexDirection: 'row',alignItems:'center' }}>
              <Ionicons name='lock-closed-outline' size={28} color={'#868889'} />
             <Controller
              name='password'
              control={control}
              render={({field:{onChange , onBlur , value}})=>(
                <TextInput 
                // onChangeText={(text) => setpassword(text)}
                placeholder='Password' secureTextEntry={secureText} style={{ fontSize: 17, marginLeft: 12 ,flex:1}} 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                />
              )}
              rules={{required : true , minLength:6}}
             />
            </View>

            <TouchableOpacity onPress={() => {setSecureText(!secureText)}}>
            <Ionicons name={secureText ? 'eye-off-outline' : 'eye-outline'} size={24} color={'#868889'}/>
            </TouchableOpacity>
          </View>
          {
            errors.password && <Text style={style.errmsg}>Password must contain At least Six Character</Text>
          }

          {
            isloading?
            <ActivityIndicator size="large" color="#6CC51D" style={{ marginTop: 20 }} />:
            <TouchableOpacity onPress={
              handleSubmit(signUpAPI)        
            }>
              <View style={style.butn}>
                 <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Signup</Text>
              </View>
            </TouchableOpacity>
          }
         
          <View style={style.richtext}>
          <TouchableOpacity style={{flexDirection:'row'}} onPress={() => props.navigation.navigate('Login')}>
            <Text style={{ color: 'grey', fontSize: 18 }}>Already have an account? </Text>
        
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
    padding: 8,
    paddingHorizontal:14,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOffset: { height: 2.5, width: 2 },
    shadowOpacity: 0.3,
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
  },
  errmsg:{
    color:'red'
  }

});