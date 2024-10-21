import React,{useState , useEffect} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ProductContainer(props) {
    const categoryId = props.id;
    const [data, setData] = useState([]);
    const GetProducts = async () => {

        const url = 'https://grocery.partnerinai.in/products';
        let result = await fetch(url);
        result = await result.json();
        console.log(result.data)
        setData(result);
    }

    useEffect(() => {
        GetProducts();
        console.log(data);
    }, []);


    return (
        <View>
            <View style={style.container}>
                {
                data.filter(item => item.categoryId === categoryId)
                .map((item, index) => {
                    return (
                        <View key={index} style={style.productContainer}>
                            <View style={style.productcontent}>
                                <Image style={style.productImage} source={require('../assets/peach.png')} />
                                <Text style={style.price}>{item.price}</Text>
                                <Text style={style.producttitle}>{item.title}</Text>
                                <Text style={style.quantity}>{item.stockAtPresent+" "+item.unit}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={style.horizontalline} />
                            </View>
                            <TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 5 }}>
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
    );
}

const style = StyleSheet.create(
    {
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
            marginVertical: 10
        }
    }
)