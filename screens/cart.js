import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TouchableHighlight, Image, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { URL } from "../utils/constants";
import { useSelector } from "react-redux";
import RazorpayCheckout from 'react-native-razorpay';
import axios from "axios";
export default function Cart({ navigation }) {
    const imgurl = URL + '/';
    const { token } = useSelector((state) => state.auth)
    const [cartProduct, setcartProduct] = useState([])
    const [orderData, setOrderData] = useState({});
    const [total, setTotal] = useState();
    const [paymentData, setpaymentData] = useState({});
    console.log("Hi");
    const GetCart = async () => {
        try {

            const url = URL + `/cart`;
            let result = await fetch(url,
                {
                    method: "GET",
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            result = await result.json();
            if (result) {

                setcartProduct(result.products);
                setTotal(result.finalTotalPrice);
            }

        }
        catch (error) {
            console.log(error.response.data.message || error.message,error)
        }
    }

    useEffect(() => {
        GetCart();
    }, [token]);

    const deleteCart = async (id) => {
        try {
            const url = URL + `/cart/delete/${id}`;
            let result = await fetch(url,
                {
                    method: "GET",
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            result = await result.json();

        }
        catch (error) {
            console.log(error?.response?.data?.message || error.message)
        }
        GetCart();
    }


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
    return (
        <View style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons style={{ fontSize: 34, color: 'black', right: 60 }} name="arrow-back" />
                    </TouchableOpacity>
                    <Text style={style.headertitle}>Shopping Cart</Text>
                </View>
                <View >
                    <View style={style.container2}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            {cartProduct.map((item, index) => {
                                return (
                                    <View key={index} style={style.productcontainer}>
                                        <View style={style.leftcontent}>
                                            <View style={style.imagebg}>
                                                <Image style={{ height: 55, width: 55 ,resizeMode:'stretch'}} source={{ uri: imgurl + item.images }} />
                                            </View>
                                            <View>
                                                <Text style={style.price}>Rs {item.totalPrice}</Text>
                                                <Text style={style.producttitle}>{item.title}</Text>
                                                <Text style={style.quantity}>Quantity: {item.quantity}</Text>
                                            </View>
                                        </View>
                                        <View>
                                        </View>
                                        <View style={style.rightcontent}>

                                            <TouchableOpacity onPress={
                                                () => {
                                                    deleteCart(`${item.productId}`)
                                                }
                                            }>
                                                <View>
                                                    <Ionicons name="trash-outline" color="red" size={22} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )

                            })
                            }
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <View style={style.cartcost}>
                <View style={style.row}>
                    <Text style={style.smalltext}>Subtotal</Text>
                    <Text style={style.smalltext}>Rs {total}</Text>
                </View>

                <View style={style.row}>
                    <Text style={style.smalltext}>Shipping Charges</Text>
                    <Text style={style.smalltext}>Rs 0.0</Text>
                </View>

                <View style={style.horizonline}></View>

                <View style={style.row}>
                    <Text style={style.bigtext}>Total </Text>
                    <Text style={style.bigtext}>Rs {total}</Text>
                </View>
                <TouchableHighlight onPress={() => {
                    // createOrder();
                    navigation.navigate('shippingaddress');
                }}>
                    <View style={style.butn}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Checkout</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>

    );
}
const style = StyleSheet.create({

    container2: {
        marginHorizontal: 20,
        color: 'white',

    },
    productcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginVertical: 10,

    },
    leftcontent: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    price: {
        color: '#6CC51D',
        fontSize: 14,
        fontWeight: '400',
        marginVertical: 2
    },
    quantity: {
        color: '#868889',
        fontSize: 14,
        marginVertical: 2

    },
    producttitle: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        marginVertical: 2,
        width: 152
    },
    rightcontent: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginRight: 10,
        padding: 5,
    },
    icon: {
        color: '#6CC51D',
        fontSize: 28
    },
    count: {
        fontSize: 22,
        fontWeight: '600'
    },
    imagebg: {
        backgroundColor: '#D2FFD0',
        borderRadius: 50,
        padding: 10,
        alignItems: 'flex-end'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingTop: 60,
        paddingHorizontal: 18,
        width: 350

    },
    headertitle: {
        fontSize: 26,
        fontWeight: '600',
        right: 20
    },
    cartcost: {
        padding: 20,
        height: 230,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderColor: 'green',
        borderWidth: 1,
        bottom: 0,
        alignSelf: 'stretch'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    horizonline: {
        borderBottomWidth: 1,
        borderBottomColor: '#b5b5b5'
    },
    smalltext: {
        color: 'grey'
    },
    bigtext: {
        fontSize: 23,
        fontWeight: '700'
    },
    butn: {

        backgroundColor: "#6CC51D",
        padding: 20,
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.2,
        marginTop: 10,
        marginBottom: 20,
    },

})