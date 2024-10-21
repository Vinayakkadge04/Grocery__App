import React from "react";
import {View , Text, StyleSheet , TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ShippingMethod({navigation}){
    return(
        <View style={{justifyContent:'space-between', flex:1}}>
        
            <View>
                <View style={style.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                        <Ionicons style={{ fontSize: 34, color: 'black', right: 80 }} name="arrow-back" />
                    </TouchableOpacity>
                    <Text style={style.headertitle}>Shipping Method</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <View>
                        <View style={style.circle}>
                            <Ionicons style={style.icon} name='checkmark-sharp' />
                        </View>
                        <Text style={style.smalltext}>Delivery</Text>
                    </View>
                    <View style={style.horizonline}></View>
                    <View>
                        <View style={[style.circle, { backgroundColor: 'white' }]}>
                            <Text style={{ color: 'grey', fontSize: 20 }}>2</Text>
                        </View>
                        <Text style={style.smalltext}>Address</Text>
                    </View>
                    <View style={[style.horizonline, { backgroundColor: '#b4b4b4' }]}></View>
                    <View>
                        <View style={[style.circle, { backgroundColor: 'white' }]}>
                            <Text style={{ color: 'grey', fontSize: 20 }}>3</Text>
                        </View>
                        <Text style={style.smalltext}>Payment</Text>
                    </View>
                </View>
                <View style={style.cardsection}>

                    <View style={style.card}>
                        <View style={style.cardleft}>
                            <Text style={style.title}>Standard Delivery</Text>
                            <Text style={style.subtitle}>Order will be delivered between 3 - 4 business {'\n'}days straights to your doorstep.</Text>
                        </View>
                        <Text style={style.cardright}>$3</Text>
                    </View>

                    <View style={style.card}>
                        <View style={style.cardleft}>
                            <Text style={style.title}>Next Day Delivery</Text>
                            <Text style={style.subtitle}>Order will be delivered between 3 - 4 business {'\n'}days straights to your doorstep.</Text>
                        </View>
                        <Text style={style.cardright}>$5</Text>
                    </View>

                    <View style={style.card}>
                        <View style={style.cardleft}>
                            <Text style={style.title}>Nominated Delivery</Text>
                            <Text style={style.subtitle}>Order will be delivered between 3 - 4 business {'\n'}days straights to your doorstep.</Text>
                        </View>
                        <Text style={style.cardright}>$3</Text>
                    </View>

                </View>
            </View>

            
                <TouchableOpacity onPress={()=>{navigation.navigate('payment')}}>
                    <View style={style.butn}>
                        <Text style={{color:'white', fontSize:18,fontWeight:'600'}}>Next</Text>
                    </View>
                </TouchableOpacity>

            
        </View>
    )
}
const style= StyleSheet.create({
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
    circle: {
        height: 45,
        width: 45,
        backgroundColor: '#6CC51D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        left: 4
    },
    horizonline: {
        width: 100,
        height: 1,
        backgroundColor: '#6CC51D',
        bottom: 10
    },
    smalltext: {
        color: 'grey',
        fontSize: 16
    },
    icon: {
        fontSize: 25,
        fontWeight: '600',
        color: 'white'
    },
    cardsection:{
        margin:20,
        gap:20

    },
    card:{
        backgroundColor:'white',
        padding:25,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    title:{
        fontSize:20,
        fontWeight:'700'
    },
    subtitle:{
        color:'grey'
    },
    cardleft:{
        gap:10
    },
    cardright:{
        color:'#6CC51D',
        fontSize:21,
        fontWeight:'600'
    },
    butn:{
        backgroundColor:"#6CC51D",
        padding:17,
        alignItems:'center',
        borderRadius:5,
        shadowColor:'black',
        shadowOffset:{height:2,width:2},
        shadowOpacity:0.2,
        margin:20,
        
      },    
})