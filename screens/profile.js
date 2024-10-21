import React from "react";
import { View, Text, StyleSheet, Image, Touchable, TouchableOpacity, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../component/redux/Authslice";


export default function Profile(props) {
  
    const {info} = useSelector((state) => state.auth)
    const dispatch = useDispatch()


    return (
        <ScrollView>
        <View>
            <View style={style.uppercontaine}></View>
            <View style={style.view}>
                <Image style={style.profile} source={require('../assets/profile.jpeg')} />
                <Text style={style.name}>{info.customerName}</Text>
                <Text style={style.email}>{info.customerEmail}</Text>
            </View>

            <View style={{ gap: 24, top: -30 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('addaddress')}>
                    <View style={style.row}>
                        <View style={style.left}>
                            <Ionicons size={30} style={style.icon} name='person-circle-outline' />
                            <Text style={style.text}>About me</Text>
                        </View>
                        <Ionicons style={style.foricon} name="chevron-forward" />

                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>props.navigation.navigate('order')}>    
                <View style={style.row}>
                   
                    <View style={style.left}>
                        <Feather size={30} style={style.icon} name='package' />
                        <Text style={style.text}>My Order</Text>
                    </View>
                    <Ionicons style={style.foricon} name="chevron-forward" />
                </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => props.navigation.navigate('fevourite')}>
                    <View style={style.row}>
                        <View style={style.left}>
                            <Ionicons size={28} style={style.icon} name='heart-outline' />
                            <Text style={style.text}>My Favourite</Text>
                        </View>
                        <Ionicons style={style.foricon} name="chevron-forward" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={style.row}>
                        <View style={style.left}>
                            <Ionicons size={30} style={style.icon} name='location-outline' />
                            <Text style={style.text}>Add Address</Text>
                        </View>
                        <Ionicons style={style.foricon} name="chevron-forward" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('mycards')}>
                    <View style={style.row}>
                        <View style={style.left}>
                            <EvilIcons size={30} style={style.icon} name='credit-card' />
                            <Text style={style.text}>Credit Cards</Text>
                        </View>

                        <Ionicons style={style.foricon} name="chevron-forward" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('transaction')}>
                    <View style={style.row}>
                        <View style={style.left}>
                            <MaterialIcons size={22} style={style.icon} name='currency-exchange' />
                            <Text style={style.text}>Transactions</Text>
                        </View>

                        <Ionicons style={style.foricon} name="chevron-forward" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('notification')}>
                    <View style={style.row}>
                        <View style={style.left}>
                            <Ionicons size={28} style={style.icon} name='notifications-outline' />
                            <Text style={style.text}>Notifications</Text>
                        </View>
                        <Ionicons style={style.foricon} name="chevron-forward" />
                    </View>
                </TouchableOpacity>


                <View style={style.row}>
                    <View style={style.left}>
                        <AntDesign size={22} style={style.icon} name='logout' />
                        <TouchableOpacity onPress={() => 
                            {   
                                dispatch(logout());
                                props.navigation.navigate('Login')
                                }
                            }
                        >
                        <Text style={style.text}>Sign out</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>

          
            </View>

        </View>
        </ScrollView>
    );
}
const style = StyleSheet.create({
    container: {
        flex: 1,

    },
    uppercontaine: {
        backgroundColor: 'white',
        height: 180
    },

    profile: {
        overflow: 'hidden',
        borderRadius: 80,
        alignSelf: 'center',
        top: -80,
        height: 150,
        width: 150,
        resizeMode:'stretch'
    },
    name: {
        fontSize: 23,
        fontWeight: '800',
        top: -70,
        alignSelf: 'center',
    },
    view: {
        alignSelf: 'center',
        top: 0,
        justifyContent: 'center'
    },
    email: {
        fontSize: 16,
        fontWeight: '600',
        top: -70,
        alignSelf: 'center',
        color: 'grey'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    left: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    icon: {
        color: '#28B446'
    },
    text: {
        fontSize: 20,
        fontWeight: '500'
    },
    foricon: {
        color: '#868889',
        fontSize: 27
    }
})