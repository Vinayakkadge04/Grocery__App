import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image ,ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { URL } from "../utils/constants";
import { useSelector } from "react-redux";


export default function MyOrder({ navigation }) {

    const { token } = useSelector((state) => state.auth)
    const imgurl = URL + '/';
    const [show, setShow] = useState()
    const [loading , setloading] = useState(false)
    // ********* API for getting Order ******************
    const [data, setData] = useState([]);

    const GetOrders = async () => {
        try {
            setloading(true)
            const url = URL + '/orders/all';
            let result = await fetch(url,
                {
                    method: 'GET',
                    headers: 
                    {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            if(!result.ok) 
                setloading(false)
                throw new Error(await result.json())
            result = await result.json();
            setData(result);

        }
        catch (error) {
            setloading(false)
            console.log(JSON.stringify(error, null, 2), 'in error');
            console.log(error?.response?.data?.message || error.message, 'in error');
        }
    }

    // ******************************* API for delete API **************************************


    const RemoveOrders = async (id) => {
        try {
            const url = URL + `/orders/delete/${id}`;
            let result = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            result = await result.json();

        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2));
            console.log(error?.response?.data?.message || error.message);
        }
        GetOrders();
    }
    useEffect(() => {
        GetOrders();
    }, []);


    return (
        <ScrollView>
            <View>
                <View style={style.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons style={{ fontSize: 34, color: 'black', right: 80 }} name="arrow-back" />
                    </TouchableOpacity>
                    <Text style={style.headertitle}>My Order</Text>
                </View>

                <View>
                    <View style={style.cardsection}>
                        {
                            data.length ?
                                data.map((item, index) => {

                                    return (
                                        <View>
                                            <View key={index} style={style.card}>

                                                <View style={style.cardleft}>
                                                    <View style={style.cardbtm1}>
                                                        <Text style={style.title}>Order ID:{item.orderId}</Text>
                                                        {/* <TouchableOpacity onPress={() => {
                                                            console.log("Delete")
                                                            RemoveOrders(item.orderId)
                                                        }
                                                        }>
                                                            <Ionicons name="trash-sharp" color='red' size={22} />
                                                        </TouchableOpacity> */}
                                                    </View>

                                                    <View style={style.cardbtm}>
                                                        <Text>Status: {item.orderStatus}</Text>
                                                        <View>
                                                            <Text style={style.subtitle}>Placed on: {item.orderDate.split('T')[0]}</Text>
                                                            <Text style={style.subtitle}>Total Price: {item.totalPrice} </Text>
                                                        </View>

                                                    </View>
                                                    <TouchableOpacity onPress={() => {
                                                        setShow(item.orderId);
                                                    }}>
                                                        <View style={style.btn}>
                                                            <Text>Show Products</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            {
                                               show === item.orderId ?
                                                    item.products.map((productitem, index) => {
                                                        return (
                                                            <View>
                                                                <View key={index} style={style.productcontainer}>
                                                                    <View style={style.leftcontent}>
                                                                        <View style={style.imagebg}>
                                                                            <Image style={{ height: 65, width: 65, resizeMode: 'stretch' }} source={{ uri: imgurl + productitem.images }} />
                                                                        </View>
                                                                        <View>
                                                                            <Text style={style.price}>{productitem.totalPrice}</Text>
                                                                            <Text style={style.producttitle}>{productitem.title}</Text>

                                                                        </View>
                                                                    </View>
                                                                    <View>

                                                                    </View>
                                                                    <View style={style.rightcontent}>
                                                                        <View>
                                                                            <Text style={style.count}></Text>
                                                                        </View>

                                                                    </View>
                                                                </View>
                                                            </View>
                                                        )
                                                    }) : null
                                            }

                                        </View>
                                    )
                                }
                                ) : null
                        }
                    </View>
                </View>
            </View>
        </ScrollView>
    )
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
    cardsection: {
        margin: 20,
        gap: 20

    },
    card: {
        backgroundColor: 'white',
        padding: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        fontWeight: '700'
    },
    subtitle: {
        color: 'grey',

    },
    cardleft: {
        gap: 10
    },
    cardright: {
        color: '#6CC51D',
        fontSize: 21,
        fontWeight: '600'
    },
    cardbtm: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20

    },
    cardbtm1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: "#6CC51D",
        padding: 17,
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.2,
        marginTop: 10,

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
        marginVertical: 2
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
    }
})