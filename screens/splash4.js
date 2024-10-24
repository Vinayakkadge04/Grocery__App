import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";

export default function Splash4({ navigation }) {


    const { isLoggedIn } = useSelector((state) => state.auth)

    return (
        <View style={style.container}>
            <ImageBackground style={style.image} source={require('../assets/splash4.png')}>
                <View style={style.topcontent}>
                    <Text style={style.title}>
                        Get Discounts On All Products
                    </Text>

                    <Text style={style.subtitle}>
                        Affordable Prices on Quality Products – Discounts Storewide
                    </Text>
                </View>
                <TouchableOpacity style={{ alignSelf: 'stretch' }}
                    onPress={() => {
                        console.log(isLoggedIn);
                        if (isLoggedIn === true) {

                            navigation.reset
                                ({
                                    index: 0,
                                    routes: [{ name: 'Main' }]
                                })
                        }
                        else {
                            navigation.navigate('welcome')
                        }

                    }

                    }>

                    <View style={style.butn}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Get Started</Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20
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

    },
    topcontent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        gap: 20
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        textAlign: 'center',

    },
    subtitle: {
        color: 'grey',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '600'
    }
})