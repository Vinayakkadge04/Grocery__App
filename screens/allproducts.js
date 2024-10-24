import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Image, SafeAreaView ,ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { URL } from "../utils/constants";
import { useSelector } from "react-redux";

const imgurl = URL+'/'
export default function Vegetables(props) {

    const { token } = useSelector((state) => state.auth)
    const categoryId = props.route.params.id;
    const [data, setData] = useState([]);
    const [isloading , setisloading] = useState(false)

    const GetProducts = async () => {

        try {
            setisloading(true)
            const url = URL + `/products/category/${categoryId}`;
            let result = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (result.status === 200) {
                result = await result.json();
                setData(result);
            }
            setisloading(false)
        }
        catch (error) {
            setisloading(false)
            Alert.alert("Something Went Wrong, Please Try Again")
            console.log(JSON.stringify(error, null, 2));
            console.log(error?.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        GetProducts();
    }, []);


    return (

        isloading ?
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                 <ActivityIndicator size="large" color="#6CC51D" style={{ marginTop: 20 }} />
            </View> :    

        <SafeAreaView style={{flex:1}}>
        <View>
            <View style={style.header}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Ionicons style={{ fontSize: 28, color: 'black' }} name="arrow-back" />
                </TouchableOpacity>

                <Text style={style.headertitle}>{props.route.params.title}</Text>
                <View></View>
                {/* <Ionicons style={{ fontSize: 34, color: 'black' }} name="options-sharp" /> */}
            </View>
            
            <ScrollView style={{marginBottom:120}}> 
                <View style={style.container1}>
                    <View>
                        <View style={style.container}>
                            {
                                data.length ?
                                    data.map((item, index) => {
                                        console.log(item.prices);
                                        return (
                                            <View key={index} style={style.productContainer}>
                                                 <TouchableOpacity onPress={() => props.navigation.navigate('describe', { id: item.productId })}>
                                                <View style={style.productcontent}>
                                                    
                                                <Image
                                                    style={{ width: 100, height: 100, resizeMode: 'stretch',}}
                                                    source={{ uri: imgurl + item.images }} />                                                               
                                                    <Text style={style.price}>Rs {item.price}</Text>
                                                    <Text style={style.producttitle}>{item.title}</Text>
                                                    <Text style={style.quantity}>{item.stockAtPresent + " " + item.unit}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={style.horizontalline} />
                                                </View>
                                               
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 5, justifyContent:'center',}}>
                                                        <MaterialCommunityIcons name="shopping-outline" color={'#6CC51D'} size={20} />
                                                        <Text>Add to cart</Text>
                                                    </View>
                                                </TouchableOpacity>

                                            </View>
                                        )
                                    }
                                    ) : null
                            }
                        </View>
                    </View>


                </View>

            </ScrollView>

        </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingVertical: 22,
        // paddingTop: 60,
        paddingHorizontal: 18,
    },
    headertitle: {
        fontSize: 22,
        fontWeight: '600'
    },
    container1: {
        padding: 20
    },
    container: {
        flex: 1,
        display: 'flex',
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    productContainer: {
        marginVertical: 8,
        alignItems: 'center',
        backgroundColor: 'white',
        width: 160,
        borderRadius: 12
    },
    productcontent: {
        padding: 10,
        alignItems: 'center'
    },
    horizontalline: {
        flex: 1,
        height: 1,
        backgroundColor: 'grey',
        opacity: 0.5,

    },
    icon: {
        fontSize: 22,
        color: '#868889'
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
        marginVertical: 2,
        textAlign:'center'
    },
    quantity: {
        color: '#868889',
        fontSize: 14,
        marginVertical: 2

    },
    productImage: {
        marginVertical: 10
    }
})