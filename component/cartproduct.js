import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import productdata from "../Data/product";

export default function Cartproduct() {

    return (
        <View style={style.container2}>
            <ScrollView

                showsVerticalScrollIndicator={false}>
                {
                    productdata.map((item, index) => (

                        <View key={index} style={style.productcontainer}>
                            <View style={style.leftcontent}>
                                <View style={style.imagebg}>
                                    <Image source={require('../assets/broccoli.png')}/>
                                </View>
                                <View>
                                    <Text style={style.price}>{item.price}</Text>
                                    <Text style={style.producttitle}>{item.name}</Text>
                                    <Text style={style.quantity}>{item.quantity}</Text>
                                </View>
                            </View>
                            <View>

                            </View>
                            <View style={style.rightcontent}>
                                <View>
                                    <Text style={style.count}>5</Text>
                                </View>

                            </View>
                        </View>
                        )
                    )
                }
            </ScrollView>
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