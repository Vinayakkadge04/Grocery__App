import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, ScrollView, Alert , ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { useSelector } from "react-redux";
import { Controller, useForm } from 'react-hook-form'
import { URL } from "../utils/constants";
export default function AddAddress({ navigation }) {


    const { token, info } = useSelector((state) => state.auth)
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [Name, setName] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isloadding , setisloadding] = useState(false)
    const { control,
        handleSubmit,
        formState: {
            errors
        }

    } = useForm()

    const submit = (data) => {
        
        console.log("name",data.Name)
        console.log("email",data.email)
        console.log("phone",data.phone)
        console.log("address",data.address)
        console.log("zip",data.zip)
        console.log("counttry",data.country)
        console.log("city",data.city)    }

    const UpdateData = async (data) => {
        try {
            
            setisloadding(true)
            const url = URL + `/customer/update/${info.customerId}`;
            
            const result = await axios.post(url, {
                customerName: data.Name,
                customerEmail: data.email,
                customerPhone: data.phone,
                customerAddress: data.address,
                customerZipCode: data.zip,
                customerCity: data.city,
                customerCountry: data.country

            },
                {
                    headers: {

                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("StatusCode", result.status)
            if (result.status === 200) {
                setisloadding(false)
                Alert.alert("Data Updated Successfully")
            }
        }

        catch (error) {
            Alert.alert("Something Went Wrong...Please Try Again")
            setisloadding(false)
            console.log("Error to Update Customer", error);
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
                            <Controller
                                name='Name'
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        // onChangeText={(text) => setName(text)}
                                        style={style.inputtext}
                                        placeholder={info.customerName ? `${info.customerName}` : 'Enter your name'}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                    />
                                )}
                                rules={{ required: true }}
                            />
                        </View>
                        {
                            errors.Name && <Text style={style.errtext}>Name can not be empty</Text>
                        }
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="mail-outline" />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={style.inputtext} placeholder={info ? `${info.customerEmail}` : "Name"}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                    />
                                )}
                                rules={{ required: true, pattern: /\S+@\S+\.\S+/ }}
                            />
                        </View>
                        {
                            errors.email && <Text style={style.errtext}>Enter Valid Email </Text>
                        }
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="call-outline" />
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        // onChangeText={(text) => setphone(text)}
                                        style={style.inputtext} placeholder={info.customerPhone ? `${info.customerPhone}` : "Phone"}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange} />
                                )}
                                rules={{ required: true, pattern: /^\d{10}$/ }}

                            />
                        </View>
                        {errors.phone && <Text style={style.errtext}>Invalid Phone</Text>}
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="location-outline" />
                            <Controller
                                name="address"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        // onChangeText={(text) => setphone(text)}
                                        style={style.inputtext} placeholder={info.customerAddress ? `${info.customerAddress}` : "Phone"}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange} />
                                )}
                                rules={{ required: true}}

                            />
                        </View>
                        {errors.address && <Text style={style.errtext}>location is required</Text>}
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="card-outline" />
                            <Controller
                                control={control}
                                name="zip"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        // onChangeText={(text) => setZip(text)}
                                        style={style.inputtext} placeholder={info.customerZipCode ? `${info.customerZipCode}` : "Zip Code"}
                                        
                                        onBlur={onBlur}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                                rules={{ required: true }}
                            />

                        </View>
                        {errors.zip && <Text style={style.errtext}>Zip Code required</Text>}
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="map-outline" />
                            <Controller
                                control={control}
                                name="city"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        // onChangeText={(text) => setCity(text)}
                                        style={style.inputtext} placeholder={info.customerCity ? `${info.customerCity}` : "City"}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                    />

                                )}
                                rules={{ required: true }}
                            />

                        </View>
                        {errors.city && <Text style={style.errtext}>City required</Text>}
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="earth-outline" />
                            <Controller
                                name="country"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        // onChangeText={(text) => setCountry(text)}
                                        style={style.inputtext} placeholder={info.customerCountry ? `${info.customerCountry}` : "Country"}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                                rules={{ required: true }}
                            />
                        </View>
                        {errors.country && <Text style={style.errtext}>Country Required</Text>}

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

            {
                isloadding ?
                <ActivityIndicator size="large" color="#6CC51D" style={{ marginTop: 20 }} /> :
                <TouchableOpacity onPress={
                    handleSubmit(UpdateData)
                 }>
                     <View style={style.butn}>
                         <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Update</Text>
                     </View>
                 </TouchableOpacity>
            }
               
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
        paddingVertical: 18,

    },
    inputtext: {
        fontSize: 18,
        flex: 1
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
        marginTop: 0
    },
    errtext: {
        color: 'red'
    }
})