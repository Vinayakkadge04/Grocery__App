import React,{useState} from "react";
import {View , Text , TouchableOpacity, StyleSheet , Switch , ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function Notification({navigation}){


    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [isEnabled3, setIsEnabled3] = useState(false);
    const [isEnabled4, setIsEnabled4] = useState(false);

    const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
    const toggleSwitch2= () => setIsEnabled2(previousState => !previousState);
    const toggleSwitch3= () => setIsEnabled3(previousState => !previousState);
    const toggleSwitch4= () => setIsEnabled4(previousState => !previousState);

    return (
        <ScrollView>
        <View>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                    <Ionicons style={{ fontSize: 34, color: 'black', right: 80 }} name="arrow-back" />
                </TouchableOpacity>
                <Text style={style.headertitle}>Notification</Text>
            </View>

            <View>
            <View style={style.cardsection}>

                <View style={style.card}>
                    <View style={style.cardleft}>
                        <Text style={style.title}>Allow Notification</Text>
                        <Text style={style.subtitle}>Lorem ipsum dolor sit amet, consetetur sadi {'\n'}pscing elitr, sed diam nonumym</Text>
                    </View>
                    <Switch
                        style={{transform:[{scaleX:.8},{scaleY:.7}]}}
                        trackColor={{ false: "#fffff", true: "#6CC51D" }}
                        onValueChange={toggleSwitch1}
                        value={isEnabled1} />
                </View>

                <View style={style.card}>
                    <View style={style.cardleft}>
                        <Text style={style.title}>Email Notification</Text>
                        <Text style={style.subtitle}>Lorem ipsum dolor sit amet, consetetur sadi {'\n'}pscing elitr, sed diam nonumym</Text>
                    </View>
                    <Switch
                        style={{transform:[{scaleX:.8},{scaleY:.7}]}}
                        trackColor={{ false: "#fffff", true: "#6CC51D" }}
                        onValueChange={toggleSwitch2}
                        value={isEnabled2} />
                </View>

                <View style={style.card}>
                    <View style={style.cardleft}>
                        <Text style={style.title}>Order Notification</Text>
                        <Text style={style.subtitle}>Lorem ipsum dolor sit amet, consetetur sadi {'\n'}pscing elitr, sed diam nonumym</Text>
                    </View>
                    <Switch
                        style={{transform:[{scaleX:.8},{scaleY:.7}]}}
                        trackColor={{ false: "#fffff", true: "#6CC51D" }}
                        onValueChange={toggleSwitch3}
                        value={isEnabled3} />
                </View>

                <View style={style.card}>
                    <View style={style.cardleft}>
                        <Text style={style.title}>General Notification</Text>
                        <Text style={style.subtitle}>Lorem ipsum dolor sit amet, consetetur sadi pscing elitr, sed diam nonumym</Text>
                    </View>
                    <Switch
                        style={{transform:[{scaleX:.8},{scaleY:.7}]}}
                        trackColor={{ false: "#fffff", true: "#6CC51D" }}
                        onValueChange={toggleSwitch4}
                        value={isEnabled4} />
                </View>

                </View>
            </View>
        </View>
        </ScrollView>
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
        color:'grey',
        
    },
    cardleft:{
        gap:10
    },
    cardright:{
        color:'#6CC51D',
        fontSize:21,
        fontWeight:'600'
    },
})