import React, { useState, useEffect, memo } from "react";
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity ,Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { URL } from "../utils/constants";

export default function HomeScreen({ navigation }) {
    
    const {token ,isLoggedIn , info}  = useSelector((state) => state.auth) 
    const imgurl = URL+'/';
    const [catdata, setcatData] = useState([]);
    const GetCategoty = async () => {
        
        try {
            const url = URL + '/categories';
            let result = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            if(result.status === 200){
                result = await result.json();
               
                setcatData(result);
            }else{
                Alert.alert(message="Error getting Category Data...")
            }
        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2));
            console.log(error?.response?.data?.message || error.message);
        }
    
    }

    const [data, setData] = useState([]);
    const GetProducts = async () => {
        try {
            const url = URL+`/products/category/${7}`;
            let result = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            result = await result.json();
            setData(result);
            
        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2));
            console.log(error?.response?.data?.message || error.message);
        }

    }

    useEffect(() => {
        GetCategoty();
        GetProducts();
    }, []);

    return (
        <View style={{ padding: 20, paddingTop: 40  , color:""}}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 10, marginVertical: 10, paddingVertical: 10 }}>
                <Text style={{fontSize:24, fontWeight:'600'}}>Hello {info.customerName}!</Text>
                {/* <View style={[style.container, { justifyContent: 'space-between', padding: 20, borderRadius: 8, backgroundColor: "#e6e6f0" }]}>
                    <View style={[style.container]}>
                        <Ionicons style={style.icon} name="search" />
                        <TextInput style={[style.textInput, { marginLeft: 10 }]} placeholder="Search keywords..." />
                    </View>
                    <Ionicons style={style.icon} name="menu" />
                </View> */}

                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}>

                    <View style={style.category}>
                        <View >
                            <Image style={style.bannercontainer}
                                source={require('../assets/banner2.webp')} />
                        </View>
                        <View >
                            <Image style={style.bannercontainer}
                                source={require('../assets/home-banner.png')} />
                        </View>
                    </View>
                </ScrollView>


                <TouchableOpacity onPress={() => navigation.navigate('category')}>
                    <View style={[style.container, { justifyContent: 'space-between' }]}>
                        <Text style={style.title}>
                            Categories
                        </Text>
                        <Ionicons style={style.icon} name='chevron-forward' />
                    </View>
                </TouchableOpacity>


                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={style.category}>
                        {
                            catdata.length ?
                                catdata.map((item , index) =>

                                    <TouchableOpacity  key={index} onPress={() => { navigation.navigate('vegetable', { title: item.categoryName, id: item.categoryId }) }}>
                                        <View style={style.category2}>
                                            <View style={[style.categoryImage, { backgroundColor: '#E6F2EA' }]}>
                                                <Image
                                                    style={{ width: 45, height: 45, resizeMode: 'stretch',}}
                                                    source={{ uri: imgurl + item.categoryImage }} />
                                            </View>
                                            <Text style={{ color: '#868889', fontSize: 12 }}>{item.categoryName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : null
                        }

                    </View>

                </ScrollView>
                <TouchableOpacity onPress={
                    () => navigation.navigate('vegetable', { title: "Featured Product", id:7})}>
                    <View style={[style.container, { justifyContent: 'space-between', paddingTop: 20 }]}>
                        <Text style={style.title}>
                            Featured products
                        </Text>
                        <Ionicons style={style.icon} name='chevron-forward' />
                    </View>
                </TouchableOpacity>

                <View>
                    <Text></Text>
                </View>

                <TouchableOpacity>
                    <View>
                        <View style={style.container}>
                            { 
                            Array.isArray(data) && data.map((item, index) =>

                                {
                                 
                                    return (
                                        <View key={index} style={style.productContainer}>
                                            <TouchableOpacity onPress={() => navigation.navigate('describe', { id: item.productId })}>
                                            <View style={style.productcontent}>
                                                <Image style={style.productImage} source={ item.images ? { uri: imgurl + item.images } : require("../assets/organic.jpeg")} />
                                                <Text style={style.price}>{item.price}</Text>
                                                <Text style={style.producttitle}>{item.title}</Text>
                                                <Text style={style.quantity}>{item.stockAtPresent + " " + item.unit}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:'center'}}>
                                                <View style={style.horizontalline} />
                                            </View>
                                            
                                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 5 ,justifyContent:'center'}}>
                                                    <MaterialCommunityIcons name="shopping-outline" color={'#6CC51D'} size={20} />
                                                    <Text>Add to cart</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    )
                                }
                                )
                            }
                        </View>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}
const style = StyleSheet.create(
    {
        name: {
            fontSize: 23,
            fontWeight: '700'
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        icon: {
            fontSize: 22,
            color: '#868889'
        },
        textInput: {
            fontSize: 18,
            color: '#868889'
        },
        homebanner: {
            resizeMode: 'containe',

            marginVertical: 10
        },
        title: {
            fontSize: 18,
            fontWeight: '700',
        },
        category: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        category2: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8
        },
        categoryImage: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            height: 60,
            width: 60
        },
        topslider: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        bannercontainer: {
            height: 300,
            width: 500,
            resizeMode: 'cover'
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
            marginVertical: 2
        },
        quantity: {
            color: '#868889',
            fontSize: 14,
            marginVertical: 2

        },
        productImage: {
            marginVertical: 10,
            height:90,
            width:90,
            resizeMode:'contain'
        }
    }
)