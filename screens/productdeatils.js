import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import { URL } from "../utils/constants";
import { useSelector } from "react-redux";

export default function Description(props) {

    const { token } = useSelector((state) => state.auth)
    const [counter, setcounter] = useState(1);
    const [selectedRadio, setselectedRadio] = useState();
    const pId = props.route.params.id;
    const [data, setData] = useState([]);
    const [vardata, setvardata] = useState([]);
    const [selectweight, setselectweight] = useState();
    imgurl = URL + '/'
    const GetProducts = async () => {
        const url = URL + `/products/edit/${pId}`;
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
        setData(result);
        console.log(imgurl + data.images)
    }

    const GetVarient = async () => {
        try {

            const url = URL + `/products/variations/update/${pId}`;
            let result = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            result = await result.json();
            console.log(result);
            setvardata(result);
        } catch (error) {

            console.log(JSON.stringify(error, null, 2));
            console.log(error?.response?.data?.message || error.message);
        }
    }
    useEffect(() => {
        GetProducts();
        GetVarient();

    }, []);

    return (
        <View>
            <ScrollView>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#F2FFE6' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Ionicons style={{ fontSize: 34, color: 'black', top: 36, left: 30, zIndex: 5 }} name="arrow-back" />
                    </TouchableOpacity>
                    <View style={style.container}>
                        <View style={style.productbg}>
                            <View style={{ alignItems: 'center' }}>
                                <Image style={{ height: 300, width: 300, resizeMode: 'stretch' }}
                                    source={{ uri: imgurl + data.images }} />
                            </View>
                        </View>
                        <View style={style.describecontainer}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={style.price}></Text>
                                <Ionicons style={{ color: 'grey', fontSize: 24, marginRight: 10 }} name="heart-outline" />
                            </View>

                            <Text style={style.producttitle}>{data.title}</Text>
                            <Text style={style.quantity}>Available Stock: {data.stockAtPresent + " " + data.unit}</Text>
                            <View style={style.review}>
                                <Text style={style.reviewcount}>4.5</Text>
                                <Image source={require('../assets/review.png')} />
                                <Text style={style.quantity}>(89 reviews)</Text>
                            </View>
                            <Text style={style.desc}>{data.description}</Text>

                            <View style={style.varcontainer}>
                                {
                                    vardata.map((item1, index) => {
                                        return (
                                            <TouchableOpacity onPress={
                                                () => {
                                                    setselectedRadio(item1.variationId)
                                                    setselectweight(item1.weightOption)
                                                }}>
                                                <View key={index} style={style.variation}>
                                                    <View style={style.radio}>
                                                        {
                                                            selectedRadio == item1.variationId ? <View style={style.radiobutton}></View> : null
                                                        }
                                                    </View>
                                                    <View style={style.varweight}>
                                                        <Text>{item1.weightOption}</Text>
                                                        <Text> {data.unit}</Text>
                                                    </View>
                                                    <Ionicons style={{ fontSize: 18, color: 'black', }} name="arrow-redo" />
                                                    <View style={style.varprice}>

                                                        <Text>Rs </Text>
                                                        <Text>{item1.price}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }

                            </View>
                            <View style={style.btn1}>
                                <Text style={style.quantity}>Quantity</Text>
                                <View style={style.quantitycount}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (counter > 1) {
                                                setcounter(counter - 1)
                                            } else {
                                                Alert.alert("Quantity can not be less than 1")
                                            }
                                        }}>
                                        <MaterialCommunityIcons style={{ color: '#6CC51D', fontSize: 24 }} name='minus' />
                                    </TouchableOpacity>
                                    <View style={style.verticleLine}></View>
                                    <Text>{counter}</Text>
                                    <View style={style.verticleLine}></View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if(selectweight === undefined){
                                                Alert.alert("Please select weight")
                                            }else

                                            if ((selectweight * counter) < data.stockAtPresent) {
                                                setcounter(counter + 1)
                                            }
                                            else {
                                                Alert.alert("We Dont have That much quantity");
                                            }

                                        }}>
                                        <MaterialCommunityIcons style={{ color: '#6CC51D', fontSize: 24 }} name='plus' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity onPress={
                                async () => {
                                   
                                    if (selectedRadio === undefined) {
                                        Alert.alert("Please Select Weight")
                                    }
                                    else {

                                        try {

                                            const url = URL + '/cart/insert';
                                            const result = await axios.post(url,
                                                {
                                                    productId: pId,
                                                    variationId: selectedRadio,
                                                    quantity: counter
                                                },
                                                {
                                                    headers:
                                                    {
                                                        Authorization: `Bearer ${token}`
                                                    }
                                                }
                                            );

                                            if (result.status === 200) {
                                                Alert.alert("Product Added in Cart");
                                                props.navigation.navigate('cart')
                                            }


                                        } catch (error) {
                                            console.log(JSON.stringify(error, null, 2));
                                            console.log(error?.response?.data?.message || error.message);
                                            Alert.alert(error.message)
                                        }

                                    }



                                }
                            }>
                                <View style={style.butn}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Add to Cart</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>

            </ScrollView>

        </View>

    )
}

const style = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: 'white',
            marginTop: 50
        },


        productbg: {
            backgroundColor: '#F2FFE6',
            padding: 20,
            borderBottomLeftRadius: 150,
            borderBottomRightRadius: 150,
            marginBottom: 60,
            height: 300
        },
        describecontainer: {
            backgroundColor: '#F4F5F9',
            borderRadius: 20,
            alignSelf: 'stretch',
            paddingVertical: 20,
            paddingHorizontal: 10,


        },
        icon: {
            size: 40,
            color: 'black',
            marginLeft: 20
        },
        review: {
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            paddingVertical: 6
        },
        price: {
            color: '#6CC51D',
            fontSize: 14,
            fontWeight: '400',
            marginVertical: 2
        },
        producttitle: {
            fontSize: 20,
            fontWeight: '600',
            color: 'black',
            marginVertical: 2
        },
        quantity: {
            color: '#868889',
            fontSize: 14,
            marginVertical: 2

        },
        reviewcount: {
            fontSize: 16,
            fontWeight: '500'
        },
        desc: {
            color: '#868889',
            lineHeight: 20
        },
        btn1: {
            backgroundColor: 'white',
            borderRadius: 6,
            shadowColor: 'black',
            shadowOffset: { height: 2, width: 2 },
            shadowOpacity: 0.1,
            height: 45,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: 16,
            marginTop: 10
        },
        verticleLine: {
            height: 45,
            width: 1,
            backgroundColor: '#BBBBBB',
            marginHorizontal: 25
        },
        quantitycount: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        butn: {
            backgroundColor: "#6CC51D",
            padding: 17,
            alignItems: 'center',
            borderRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 2, width: 2 },
            shadowOpacity: 0.2,
            marginTop: 10
        },
        varcontainer: {
            flexDirection: 'column',


        },
        variation: {
            flexDirection: 'row',
            marginBottom: -15,
            alignItems: 'center'
        },
        varweight: {

            padding: 2,
            paddingHorizontal: 8,
            flexDirection: 'row'
        },
        varprice: {

            padding: 2,
            paddingHorizontal: 8,
            flexDirection: 'row'
        },
        radio: {
            height: 20,
            width: 20,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 10,
            margin: 10
        },

        radiobutton: {
            height: 8,
            width: 8,
            borderRadius: 4,
            backgroundColor: 'black',
            margin: 5
        }
    }
)


