import React from "react";
import {View , StyleSheet , ImageBackground , Text ,Image, TouchableOpacity} from 'react-native';

export default function Splash1({navigation}){
    return (
        <View style={style.container}>
            <ImageBackground style={style.image} source={require('../assets/splash1.png')}>
            <View style={style.topcontent}>
                <Text style={style.title}>
                    Welcome to
                </Text>
                <Image source={require('../assets/small-logo.png')}/>
                <Text style={style.subtitle}>
                Get the Freshest Groceries Delivered to Your Doorstep in Just a Few Clicks
                </Text>
            </View>
            <TouchableOpacity style={{alignSelf:'stretch'}} onPress={()=> navigation.navigate('splash2')}>
            <View style={style.butn}>
                <Text style={{color:'white', fontSize:18,fontWeight:'600'}}>Get Started</Text>
            </View> 
            </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}
const style = StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'space-between',
        padding:20
    },
    butn:{
       
        backgroundColor:"#6CC51D",
        padding:20,
        alignItems:'center',
        borderRadius:5,
        shadowColor:'black',
        shadowOffset:{height:2,width:2},
        shadowOpacity:0.2,
        marginTop:10,
        
      },
      topcontent:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginTop:60
      },
      title:{
        fontSize:34,
        fontWeight:'700'
      },
      subtitle:{
        color:'grey',
        textAlign:'center',
        fontSize:15,
        fontWeight:'600'
      }
})