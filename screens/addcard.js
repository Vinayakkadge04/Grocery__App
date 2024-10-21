import React,{useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, TextInput, Switch , ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'

export default function Addcards({navigation}) {



const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <ScrollView>
        <View style={{flex:1,justifyContent:'space-between'}}>
            <View>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.navigate('mycards')}>
                    <Ionicons style={{ fontSize: 34, color: 'black', right: 60 }} name="arrow-back" />
                </TouchableOpacity>
                <Text style={style.headertitle}>Add credit card</Text>
            </View>


            <View style={style.card}>
                <ImageBackground style={style.cardbgimage} source={require('../assets/cardformat.png')}>
                    <Image style={{ height: 40, width: 70 }} source={require('../assets/master-logo.png')} />
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>XXXX XXXX XXXX 5678</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ color: 'white' }}>CARD HOLDER</Text>
                            <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>JORDEN PAREIRA</Text>
                        </View>
                        <View>
                            <Text style={{ color: 'white' }}>EXPIRES</Text>
                            <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>05/27</Text>
                        </View>
                    </View>
                </ImageBackground>

            </View>


            <View style={{ gap: 10, margin: 18 }}>
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

            </View>


            <View style={{display:'flex' , flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginHorizontal:20,}}>
            <Switch
              style={{transform:[{scaleX:.8},{scaleY:.7}]}}
              trackColor={{ false: "#fffff", true: "#6CC51D" }}
              onValueChange={toggleSwitch}
              value={isEnabled} />
              <Text>Save this card</Text>
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
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingTop: 60,
        paddingHorizontal: 18,
        marginBottom: 20,
        right: 20
    },
    headertitle: {
        fontSize: 26,
        fontWeight: '600',

    },
    card: {
        backgroundColor: '#6CC51D',
        alignSelf: 'stretch',
        height: 189,
        marginHorizontal: 15,
        borderRadius: 12,
    },
    cardbgimage: {
        padding: 20,
        height: 189,
        borderRadius: 12,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        overflow: "hidden",
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