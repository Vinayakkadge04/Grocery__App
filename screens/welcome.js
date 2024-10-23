import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
export default function Welcome({ navigation }) {
  return (
    <View style={style.container}>
      <ImageBackground style={style.image} source={require('../assets/auth1.png')}>
        <View style={style.header}>
          <Ionicons name='arrow-back-outline' size={30} color={'white'} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
          <Text style={{
            fontSize: 22,
            fontWeight: '600',
            color: 'white',
            
          }}>Welcome</Text>
          </View>
         
        </View>
        <View style={style.bottomcontainer}>
          <View>
            <Text style={style.title}>Welcome</Text>
          </View>
          <View>
            <Text style={[style.para , {paddingBottom:20}]}>Enjoy fresh groceries and great savings at your fingertips!</Text>
          </View>
          {/* <View style={style.textBox}>
            <Text style={{color:'black', fontSize:18,fontWeight:'600'}}>Continue with google</Text>
          </View> */}
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <View style={style.butn}>
            <Text style={{color:'white', fontSize:18,fontWeight:'600'}}>Continue with Email</Text>
          </View>
          </TouchableOpacity>
          
          <View style={style.richtext}>
            <TouchableOpacity style={style.richtext} onPress={()=>navigation.navigate('Login')}>
            <Text style={{color:'grey',fontSize:18}}>Already have an account ? </Text>
            <Text style={{fontSize:18,fontWeight:'600'}}>Login</Text>
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
    justifyContent:'center'
  },
  bottomcontainer: {
    backgroundColor: '#F4F5F9',
    padding:20,
    borderRadius:12
  },
  title:{
    fontSize:25,
    color:'black',
    fontWeight:'700'
  },
  para:{
    color:'#868889',
    fontSize:18
  },
  textBox:{
    backgroundColor:'white',
    padding:20,
    alignItems:'center',
    shadowColor:'black',
    shadowOffset:{height:2,width:2},
    shadowOpacity:0.2,
    marginTop:10
  },
  butn:{
    backgroundColor:"#6CC51D",
    padding:20,
    alignItems:'center',
    borderRadius:5,
    shadowColor:'black',
    shadowOffset:{height:2,width:2},
    shadowOpacity:0.2,
    marginTop:10
  },
  richtext:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingTop:20
  }
});