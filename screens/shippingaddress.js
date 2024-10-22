import React, { useState , useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, ScrollView ,Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { URL } from "../utils/constants";
import { useSelector } from "react-redux";
import RazorpayCheckout from 'react-native-razorpay';

export default function ShippingAddress({ navigation }) {

    const [isEnabled, setIsEnabled] = useState(false);
    const {token , info} = useSelector((state)=>state.auth)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [Name, setName] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [orderData, setOrderData] = useState({});
    const [paymentData, setpaymentData] = useState({});
   
    // const UpdateData = async () => {
    //     try {
    //         const url = URL+`customer/update/${info.customerId}`;
    //         console.log(url);
    //         const formData = new FormData();
    //         formData.append("customerName", Name);
    //         formData.append("customerEmail", email);
    //         formData.append("customerPhone", phone);
    //         formData.append("customerAddress", address);
    //         formData.append("customerZipCode", zip);
    //         formData.append("customerCity", city);
    //         formData.append("customerCountry", country);

    //         const result = await axios.post(url, formData, {
    //             headers: {
    //                  Authorization : `Bearer ${token}`
    //             },
    //         },
            
    //     );
    //         if (result.status === 200) {
    //             console.log("Hello");
    //             Alert.alert("User Data Updated Successfully");

    //         }
    //     } catch (error) {
    //         Alert.alert("User Data Not Updated")
    //         console.log(JSON.stringify(error, null, 2));
    //         console.log(error?.response?.data?.message || error.message);
    //     }
    // }




    const createOrder = async () => {
        try {

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
                setOrderData(result?.data);
                console.log("Order" ,orderData)
                console.log("Result " ,result.data);
                Alert.alert("Press OK to Proceed for Payment...","",
                [
                    {
                        text:"OK",
                        onPress: async() => 
                            {   console.log("Hello");
                                if (orderData){
                                   await OpenRazerpay();
                                }
                                else{
                                    Alert.alert("Order Not Created...Try Again")
                                }
                            }
                    }
                ]
                );
                
            }
            else{
                Alert.alert("Order Not Created...Try Again")
            }

        } catch (error) {

            console.log(JSON.stringify(error, null, 2),error);
            console.log(error?.response?.data?.message || error.message,error);
            Alert.alert("Network Problem , Please Try Again");
        }
    }

    const OpenRazerpay = () => {
       
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
            RazorpayCheckout.open(options).then((data) => {
            // handle success

            setpaymentData(data);
            console.log("DATA: ",data);
            Alert.alert("Payment Success","",
                [
                    {
                        text:"OK",
                        onPress:()=>{
                            if(paymentData){
                                VerifyPayment();
                            }
                            else {
                                Alert.alert("Payment Verification Not Proceed...Internal Server Error, Please Try Again");
                                
                            }
                        }
                    }
                ]
            )
            
            
            
        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }

    const VerifyPayment = async () => {
        try {
           
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
            console.log("RESULT STATUS:" ,result.status);
            if (result.status === 200) {
                Alert.alert("Payment Verified...!");
                navigation.navigate('ordersuccess')
            }
        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2),error);
            console.log(error?.response?.data?.message || error.message,error);
            Alert.alert("Payment Verification Failed..Please Try Again🙏"
            )
        }

        if (result) {
            navigation.navigate('ordersuccess');
        }

    }
   

    useEffect(() => {
      
    }, []);



   
    return (
        <View>
            <ScrollView 
                showsVerticalScrollIndicator={false} >
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons style={{ fontSize: 34, color: 'black', right: 60 }} name="arrow-back" />
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
                    <Switch
                        style={{ transform: [{ scaleX: .8 }, { scaleY: .7 }] }}
                        trackColor={{ false: "#fffff", true: "#6CC51D" }}
                        onValueChange={toggleSwitch}
                        value={isEnabled} />
                    <Text>Remember me</Text>
                </View>

                <TouchableOpacity onPress={() => { 
                    // UpdateData();
                    createOrder();
                    
                    }}>
                    <View style={style.butn}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Next</Text>
                    </View>
                </TouchableOpacity>
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
        marginHorizontal: 20

    },
})