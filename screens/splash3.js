import React from "react";
import {View , StyleSheet , ImageBackground , Text , Image , TouchableOpacity} from 'react-native';

export default function Splash3({navigation}){
    return (
        <View style={style.container}>
            <ImageBackground style={style.image} source={require('../assets/splash3.png')}>
            <View style={style.topcontent}>
                <Text style={style.title}>
                Buy Premium
Quality Fruits
                </Text>
                
                <Text style={style.subtitle}>
                Taste the Difference with Our Hand-Selected Premium Fruits
                </Text>
            </View>
            <TouchableOpacity style={{alignSelf:'stretch'}} onPress={()=> navigation.navigate('splash4')}>
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
        flex:1
    },
    image:{
        flex:1,
        justifyContent:'center',
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
      },
      topcontent:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginTop:60,
        gap:20
      },
      title:{
        fontSize:34,
        fontWeight:'700',
        textAlign:'center',
        
      },
      subtitle:{
        color:'grey',
        textAlign:'center',
        fontSize:15,
        fontWeight:'600'
      }
})