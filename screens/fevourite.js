import React from "react";
import {View , Text , StyleSheet , TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Cartproduct from "../component/cartproduct";

export default function Fevourite({navigation}){
    return(
        <View>
             <View style={style.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons style={{fontSize:34,color:'black',right:100}} name="arrow-back"/>
                </TouchableOpacity>  
                <Text style={style.headertitle}>Fevourites</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Cartproduct/>
            </ScrollView>
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
        paddingTop:60,
        paddingHorizontal:18,
             
    },
    headertitle:{
        fontSize:26,
        fontWeight:'600',
        right:20   
    },
})