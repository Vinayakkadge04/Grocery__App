import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput , ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'



export default function MyCards({ navigation }) {
    const [cardView1, setcardView1] = useState(true);
    const [cardView2,setcardView2] = useState(false);
    return (
        <ScrollView>
        <View style={{justifyContent:'space-between',flex:1}}>
              <View>
              <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                    <Ionicons style={{ fontSize: 34, color: 'black',}} name="arrow-back" />
                </TouchableOpacity>
                <Text style={style.headertitle}>My Cards</Text>
                <TouchableOpacity onPress={() => navigation.navigate('addcard')}>
                    <Ionicons style={{ fontSize: 34, color: 'black',}} name="add-circle-outline" />
                </TouchableOpacity>
            </View>


            <View style={style.cardcontainer}>

                <View>
                    <View style={style.card}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                            <View style={style.imgbg}>
                                <Image style={style.logoimg} source={require('../assets/master-logo.png')} />
                            </View>
                            <View>
                                <Text style={style.cardname}>Master Card</Text>
                                <Text style={style.cardnumber}>XXXX XXXX XXXX 5678</Text>
                                <View style={{flexDirection:'row',gap:10}}>
                                    <Text style={style.expiry}>Expiry : 01/22</Text>
                                    <Text style={style.cvv}>CVV : 908</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { setcardView1(!cardView1) }}>
                            <Ionicons size={23} color={'#28B446'} name="chevron-down" />
                        </TouchableOpacity>
                    </View>
                    {
                        cardView1 == 1 ?
                            <View style={{ gap: 10, borderTopWidth: 0.2 }}>
                                <View>
                                    <View style={style.textbox}>
                                        <EvilIcons size={39} color={'grey'} name='user' />
                                        <TextInput style={style.textin} placeholder='Name on the card' />
                                    </View>
                                </View>
                                <View>
                                    <View style={style.textbox}>
                                        <EvilIcons size={39} color={'grey'} name='credit-card' />
                                        <TextInput style={style.textin} placeholder='Card number' />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 10, }}>
                                    <View style={[style.textbox, { gap: 5, flex: 2 }]}>
                                        <Ionicons size={24} color={'grey'} name='calendar-clear-outline' />
                                        <TextInput style={style.textin} placeholder='Month/Year' />
                                    </View>
                                    <View style={[style.textbox, { gap: 5, flex: 2 }]}>
                                        <Ionicons size={24} color={'grey'} name='lock-closed-outline' />
                                        <TextInput style={style.textin} placeholder='CVV' />
                                    </View>
                                </View>

                            </View> : null
                    }
                </View>


                <View>
                    <View style={style.card}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                            <View style={style.imgbg}>
                                <Image style={style.logoimg} source={require('../assets/visa.png')} />
                            </View>
                            <View>
                                <Text style={style.cardname}>Visa Card</Text>
                                <Text style={style.cardnumber}>XXXX XXXX XXXX 4352</Text>
                                <View style={{flexDirection:'row',gap:10}}>
                                    <Text style={style.expiry}>Expiry : 01/22</Text>
                                    <Text style={style.cvv}>CVV : 908</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { setcardView2(!cardView2) }}>
                            <Ionicons size={23} color={'#28B446'} name="chevron-down" />
                        </TouchableOpacity>
                    </View>
                    {
                        cardView2 == true ?
                            <View style={{ gap: 10, borderTopWidth:0.2 }}>
                                <View>
                                    <View style={style.textbox}>
                                        <EvilIcons size={39} color={'grey'} name='user' />
                                        <TextInput style={style.textin} placeholder='Name on the card' />
                                    </View>
                                </View>
                                <View>
                                    <View style={style.textbox}>
                                        <EvilIcons size={39} color={'grey'} name='credit-card' />
                                        <TextInput style={style.textin} placeholder='Card number' />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 10, }}>
                                    <View style={[style.textbox, { gap: 5, flex: 2 }]}>
                                        <Ionicons size={24} color={'grey'} name='calendar-clear-outline' />
                                        <TextInput style={style.textin} placeholder='Month/Year' />
                                    </View>
                                    <View style={[style.textbox, { gap: 5, flex: 2 }]}>
                                        <Ionicons size={24} color={'grey'} name='lock-closed-outline' />
                                        <TextInput style={style.textin} placeholder='CVV' />
                                    </View>
                                </View>

                            </View> : null
                    }
                </View>


            </View>
                </View>  

            

            <TouchableOpacity onPress={()=>navigation.navigate('')}>
                 <View style={style.butn}>
                    <Text style={{color:'white', fontSize:18,fontWeight:'600'}}>Save settings</Text>
                </View> 
            </TouchableOpacity>


        </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around',
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingTop: 60,
        paddingHorizontal: 18,

    },
    headertitle: {
        fontSize: 26,
        fontWeight: '600',  
    },
    card: {
        backgroundColor: 'white',
        padding: 16,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoimg: {
        resizeMode: 'stretch',
        width: 50,
        height: 30
    },
    imgbg: {
        backgroundColor: '#F3F3F3',
        alignItems: 'center',
        justifyContent: 'center',
        height: 65,
        width: 65,
        borderRadius: 32
    },
    cardname: {
        fontSize: 16,
        fontWeight: '700'
    },
    datetime: {
        fontSize: 14,
    },
    cost: {
        color: '#28B446',
        fontSize: 16,
        fontWeight: '700'
    },
    cardcontainer: {
        gap: 20,
        margin: 20,

    },
    textbox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8
    },
    textin: {
        color: 'grey',
        fontSize: 22
    },
    cardnumber:{
        fontSize:14,
        color:'grey'
    },
    expiry:{
        fontSize:12
    },
    cvv:{
        fontSize:12
    },
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
        margin:20
      },
})