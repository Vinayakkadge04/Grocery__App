import React from "react";
import {View , Text , TouchableOpacity, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Transaction({navigation}){
   return(
    <View>
        <View style={style.header}>
            <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                <Ionicons style={{ fontSize: 34, color: 'black', right: 80 }} name="arrow-back" />
            </TouchableOpacity>
        <Text style={style.headertitle}>Transaction</Text>
        </View>
        <View style={style.cardcontainer}>
            <View style={style.card}>
                <View style={{flexDirection:'row', alignItems:'center',gap:15}}>
                <View style={style.imgbg}>
                    <Image style={style.logoimg} source={require('../assets/master-logo.png')}/>
                </View>
                <View>
                    <Text style={style.cardname}>Master Card</Text>
                    <Text style={style.datetime}>Dec 12 2021 at 10:00 pm</Text>
                </View>
                </View>
                <Text style={style.cost}>$89</Text>
            </View>
            <View style={style.card}>
                <View style={{flexDirection:'row', alignItems:'center',gap:15}}>
                <View style={style.imgbg}>
                    <Image style={style.logoimg} source={require('../assets/visa.png')}/>
                </View>
                <View>
                    <Text style={style.cardname}>Master Card</Text>
                    <Text style={style.datetime}>Dec 12 2021 at 10:00 pm</Text>
                </View>
                </View>
                <Text style={style.cost}>$109</Text>
            </View>
            <View style={style.card}>
                <View style={{flexDirection:'row', alignItems:'center',gap:15}}>
                <View style={style.imgbg}>
                    <Image style={style.logoimg} source={require('../assets/paypal.png')}/>
                </View>
                <View>
                    <Text style={style.cardname}>Paypal</Text>
                    <Text style={style.datetime}>Dec 12 2021 at 10:00 pm</Text>
                </View>
                </View>
                <Text style={style.cost}>$345</Text>
            </View>

            <View style={style.card}>
                <View style={{flexDirection:'row', alignItems:'center',gap:15}}>
                <View style={style.imgbg}>
                    <Image style={style.logoimg} source={require('../assets/master-logo.png')}/>
                </View>
                <View>
                    <Text style={style.cardname}>Paypal</Text>
                    <Text style={style.datetime}>Dec 12 2021 at 10:00 pm</Text>
                </View>
                </View>
                <Text style={style.cost}>$345</Text>
            </View>

        </View>
    </View>
   )
}
const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingTop: 60,
        paddingHorizontal: 18,

    },
    headertitle: {
        fontSize: 26,
        fontWeight: '600',
        right: 20
    },
    card:{
        backgroundColor:'white',
        padding:16,
        paddingHorizontal:25,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    logoimg:{
       resizeMode:'stretch',
       width:50,
       height:30
    },
    imgbg:{
        backgroundColor:'#F3F3F3',
        alignItems:'center',
        justifyContent:'center',
        height:65,
        width:65,
        borderRadius:32
    },
    cardname:{
        fontSize:16,
        fontWeight:'700'
    },
    datetime:{
        fontSize:14,
    },
    cost:{
        color:'#28B446',
        fontSize:16,
        fontWeight:'700'
    },
    cardcontainer:{
        gap:20,
        margin:20,
        
    }
})