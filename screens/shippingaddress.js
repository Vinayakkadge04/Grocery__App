import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { URL } from "../utils/constants";
import { useSelector } from "react-redux";
import RazorpayCheckout from 'react-native-razorpay';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { run } from "jest";

export default function ShippingAddress({ navigation }) {

    const [isEnabled, setIsEnabled] = useState(false);
    const { token, info } = useSelector((state) => state.auth)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [paymentData, setpaymentData] = useState({});
    const [isloadding, setisloadding] = useState(false);

    const { control,
        handleSubmit,
        setValue,
        formState: {
            errors
        }

    } = useForm()
      const MyData = async () => {
        try {
            setisloadding(true)
            const url = URL + `/customer/edit/${info.customerId}`
           
            let result = await fetch(url,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                });
                result = await result.json();

                if (result) {
                    console.log("INFO", result)
                    console.log(result.customer.customerPhone)
                    setValue('Name', result.customer.customerName);
                    setValue('email', result.customer.customerEmail);
                    setValue('phone', String(result.customer.customerPhone));
                    setValue('address', result.customer.customerAddress);
                    setValue('zip',result.customer.customerZipCode ? String(result.customer.customerZipCode): null);
                    setValue('city', result.customer.customerCity);
                    setValue('country', result.customer.customerCountry);
                }
            setisloadding(false)
            console.log("PHONE",phone)
        }
        catch(error)
        {
            setisloadding(false)
            console.log("Error fetching my Data,", error)
        }

    }

    useEffect(()=>
       { MyData()}
    ,[])

    const UpdateData = async (data) => {
        try {
            console.log(data,"DATA")
            setisloadding(true)
            const url = URL + `/customer/update/${info.customerId}`;
            console.log(data.Name, data.email, data.phone, data.address, data.zip, data.city, data.country);
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
                createOrder();
            }
        }

        catch (error) {

            setisloadding(false)
            console.log("Error to Update Customer", error);
        }
    }

    const checkAddress = (data) => {
        console.log("Info",data)
        if (info.customerAddress !== null) {
            createOrder();
        }
        else {
            if (data.address && data.Name && data.email && data.phone && data.address && data.zip && data.city && data.country) {
                console.log("hello")
                UpdateData(data);
            }
            else {
                Alert.alert("Please Fill all details...");
            }
        }

    }

    const createOrder = async () => {
        try {
            setisloadding(true)
            const url = URL + '/create-order';
            const result = await axios.post(url, {},
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (result?.status === 200) {

                await OpenRazerpay(result.data);
            }
            else {

                Alert.alert("Order Not Created...Try Again")
            }

            setisloadding(false)
        }

        catch (error) {

            console.log(JSON.stringify(error, null, 2), error);
            console.log(error?.response?.data?.message || error.message, error);
            Alert.alert("Network Problem , Please Try Again");
        }
    }

    const OpenRazerpay = async (orderData) => {

        var options = {
            description: 'Credits towards consultation',
            image: 'https://t4.ftcdn.net/jpg/02/67/29/93/360_F_267299376_Rwmrov0JGO5savkHry0J2ySMhlDd5bJN.jpg',
            currency: 'INR',
            key: 'rzp_test_9xmjkpHzMu3whL',
            amount: `${orderData?.amount}`,
            name: 'Grocery Store',
            order_id: `${orderData?.id}`,
            prefill: {
                email: 'kadgevinayak04@gmail.com',
                contact: '8806204889',
                name: 'Vinayak Kadge'
            },
            theme: { color: '#53a20e' }
        }
        await RazorpayCheckout.open(options).then((data) => {
            // handle success
            setpaymentData(data);
            console.log("DATA: ", data);
            if (paymentData) {
                VerifyPayment(data);
            }
            else {
                Alert.alert("Payment Verification Not Proceed...Internal Server Error, Please Try Again");

            }

        }).catch((error) => {
            // handle failure
            Alert.alert("Payment Failed...Try Again")
            console.log("Razerpay Error####", error);
            navigation.navigate('failed')
        });
    }

    const VerifyPayment = async (paymentData) => {
        try {
            setisloadding(true)
            console.log("Is Loading", setisloadding)
            const url = URL + '/verify-payment'
            const result = await axios.post(url, {
                razorpay_order_id: paymentData.razorpay_order_id,
                razorpay_payment_id: paymentData.razorpay_payment_id,
                razorpay_signature: paymentData.razorpay_signature

            },
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            if (result.status === 200) {
                Alert.alert("Payment Verified...!");
                navigation.navigate('ordersuccess')
            }
            setisloadding(false)
        }

        catch (error) {
            setisloadding(false)
            console.log(JSON.stringify(error, null, 2), error);
            console.log(error?.response?.data?.message || error.message, error);
            Alert.alert("Payment Verification Failed..Please Try Again🙏"
            )
        }

    }



    return (
        isloadding?
        <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
             <ActivityIndicator size="large" color="#6CC51D"  />
        </View>
        :
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false} >
                <View style={style.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons style={{ fontSize: 28, color: 'black', right: 60 }} name="arrow-back" />
                    </TouchableOpacity>
                    <Text style={style.headertitle}>Shipping Address</Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false} >
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
                        <View style={[style.horizonline, { backgroundColor: 'grey' }]}></View>
                        <View>
                            <View style={[style.circle, { backgroundColor: 'white' }]}>
                                <Text style={{ color: 'grey', fontSize: 20 }}>3</Text>
                            </View>
                            <Text style={style.smalltext}>Payment</Text>
                        </View>
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
                                        placeholder={'Enter your name'}
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
                                        style={style.inputtext}
                                        placeholder={"Name"}
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
                            {/* <Controller
                                name="phone"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        // onChangeText={(text) => setphone(text)}
                                        style={[style.inputtext]}
                                        placeholder={"Phone"}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange} />
                                )}
                                rules={{ required: true, pattern: /^\d{10}$/ }}

                            /> */}
                            <Controller
                            name="phone"
                            control={control}
                            render={({field:{onChange , onBlur , value}})=>(
                                <TextInput
                                style={style.inputtext} 
                                placeholder="Phone"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                />
                            
                            )}
                            rules={{
                                required:true , pattern:/^\d{10}$/
                            }}
                            />
                        </View>
                        {
                            errors.phone && <Text style={style/errtext}>Enter Valid Phone number</Text>
                        }
                        
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="location-outline" />
                            <Controller
                                name="address"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput

                                        style={style.inputtext} 
                                        placeholder={"Location"}
                                        onBlur={onBlur}
                                        value={value}
                                        onChangeText={onChange} />
                                )}
                                rules={{ required: true }}

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
                                        style={style.inputtext}
                                        placeholder={"Zip Code"}
                                        onBlur={onBlur}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                                rules={{ required: true , pattern:/^\d{6}$/}}
                            />

                        </View>
                        {errors.zip && <Text style={style.errtext}>Enter valid Zip Code</Text>}
                        <View style={style.textbox}>
                            <Ionicons size={28} color={'grey'} name="map-outline" />
                            <Controller
                                control={control}
                                name="city"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        // onChangeText={(text) => setCity(text)}
                                        style={style.inputtext} 
                                        placeholder={"City"}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}

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

                                        style={style.inputtext} 
                                        placeholder={"Country"}
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
                    {
                        isloadding ?
                            <ActivityIndicator size="large" color="#6CC51D" style={{ marginTop: 20 }} /> :
                            <TouchableOpacity onPress={
                                // UpdateData();
                                handleSubmit(UpdateData)

                            }>
                                <View style={style.butn}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Next</Text>
                                </View>
                            </TouchableOpacity>
                    }
                </ScrollView>
            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 22,

        paddingHorizontal: 18,

    },
    headertitle: {
        fontSize: 22,
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
        width: 80,
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
        padding: 8,
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
       paddingHorizontal:14
    },
    inputtext: {
        fontSize: 18,
        flex:1
    },
    butn: {
        backgroundColor: "#6CC51D",
        padding: 17,
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.2,
        marginHorizontal: 20,
        marginBottom:8

    },
    errtext: {
        color: "red"
    }
})