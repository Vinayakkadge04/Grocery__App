import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { useSelector } from "react-redux";
import { URL } from "../utils/constants";
export default function ShippingAddress({ navigation }) {


    const {token , info} = useSelector((state)=>state.auth)
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [Name, setName] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');


    const UpdateData = async () => {
        try {
            
            const url = URL+`/customer/update/${info.customerId}`;
            
            const formData = new FormData();
            formData.append("customerName", Name);
            formData.append("customerEmail", email);
            formData.append("customerPhone", phone);
            formData.append("customerAddress", address);
            formData.append("customerZipCode", zip);
            formData.append("customerCity", city);
            formData.append("customerCountry", country);

            const result = await axios.post(url, formData, {
                headers: {
                     Authorization : `Bearer ${token}`
                },
            },
            
        );
            if (result.status === 200) {
                console.log("Hello");
                Alert.alert("User Data Updated Successfully");

            }
        } catch (error) {
            Alert.alert("User Data Not Updated")
            console.log(JSON.stringify(error, null, 2));
            console.log(error?.response?.data?.message || error.message);
        }
    }

   

    useEffect(() => {
      
    }, []);


    return (
        <ScrollView>
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View>
                    <View style={style.header}>
                        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                            <Ionicons style={{ fontSize: 34, color: 'black', right: 80 }} name="arrow-back" />
                        </TouchableOpacity>
                        <Text style={style.headertitle}>About Me</Text>
                    </View>


                    <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="person-outline" />
                            <TextInput
                                onChangeText={(text) => setName(text)}
                                style={style.inputtext} placeholder={info.customerName ? `${info.customerName}` : "Enter your name"} />
                        </View>
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="mail-outline" />
                            <TextInput
                                onChangeText={(text) => setemail(text)}
                                style={style.inputtext} placeholder={info ? `${info.customerEmail}` : "Name"}  />
                        </View>
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="call-outline" />
                            <TextInput
                                onChangeText={(text) => setphone(text)}
                                style={style.inputtext} placeholder={info.customerPhone ? `${info.customerPhone}` : "Phone"}  />
                        </View>
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="location-outline"/>
                            <TextInput
                                onChangeText={(text) => setAddress(text)}
                                style={style.inputtext} placeholder={info.customerAddress ? `${info.customerAddress}` : "Address"} />
                        </View>
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="card-outline" />
                            <TextInput
                                onChangeText={(text) => setZip(text)}
                                style={style.inputtext} placeholder={info.customerZipCode ? `${info.customerZipCode}` : "Zip Code"}  />
                        </View>
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="map-outline" />
                            <TextInput
                                onChangeText={(text) => setCity(text)}
                                style={style.inputtext} placeholder={info.customerCity ? `${info.customerCity}` : "City"}  />
                        </View>
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="earth-outline" />
                            <TextInput
                                onChangeText={(text) => setCountry(text)}
                                style={style.inputtext} placeholder={info.customerCountry ? `${info.customerCountry}` : "Country"}  />
                        </View>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 20, }}>

                        {/* <Switch
                            style={{ transform: [{ scaleX: .8 }, { scaleY: .7 }] }}
                            trackColor={{ false: "#fffff", true: "#6CC51D" }}
                            onValueChange={toggleSwitch}
                            value={isEnabled} />
                        <Text>Remember me</Text> */}
                    </View>

                </View>


                <TouchableOpacity onPress={() => {
                    UpdateData();
                }}>
                    <View style={style.butn}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Update</Text>
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
    inputicon: {

    },
    textbox: {
        backgroundColor: 'white',
        padding: 14,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.2,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 6,
        alignSelf: 'stretch',
        gap: 10,
        paddingVertical: 18
    },
    inputtext: {
        fontSize: 18
    },
    butn: {
        backgroundColor: "#6CC51D",
        padding: 17,
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.2,
        margin: 20,
        marginTop:0
    },
})