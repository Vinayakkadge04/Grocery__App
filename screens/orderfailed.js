import React from "react";
import {View, Text , TouchableOpacity , StyleSheet , Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function OrderFailed({navigation}){
    return (
        <View style={style.body}>
           <View style={style.header}>
                <TouchableOpacity onPress={()=>navigation.navigate('Main',{ screen: 'home' })}>
                         <Ionicons style={{fontSize:34,color:'black',right:60}} name="arrow-back"/>
                </TouchableOpacity>  
                <Text style={style.headertitle}>Order Failed</Text>
            </View>
            <View style={style.body}>
                <Ionicons style={style.bag} name="bag-remove-outline"/>
                <Text style={style.title}>Your order was {`\n`} Failed!</Text>
                <Text style={style.subtitle}>You will get a response within {`\n`} a few minutes.</Text>
            </View>
            <TouchableOpacity style={{alignSelf:'stretch'}} onPress={()=>navigation.navigate('cart')}>
            <View style={style.butn}>
                    <Text style={{color:'white', fontSize:18,fontWeight:'600'}}>Go to Cart</Text>
            </View> 
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        paddingVertical:30,
        paddingHorizontal:18,
        marginBottom:20,
        top:0,
        alignSelf:'stretch',
        
    },
    headertitle:{
        fontSize:26,
        fontWeight:'600',  
        
    },
    body:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    bag:{
        fontSize:100,
        color:'#6CC51D'
    },
    title:{
        fontSize:26,
        fontWeight:'700',
        textAlign:'center',
        marginVertical:30
    } ,
    subtitle:{
        fontSize:22,
        fontWeight:'500',
        textAlign:'center',
        color:'grey'
    }  ,
    butn:{
        backgroundColor:"#6CC51D",
        padding:17,
        alignItems:'center',
        borderRadius:5,
        shadowColor:'black',
        shadowOffset:{height:2,width:2},
        shadowOpacity:0.2,
        alignSelf:'stretch',
        marginHorizontal:10,
        marginBottom:20
      },
})