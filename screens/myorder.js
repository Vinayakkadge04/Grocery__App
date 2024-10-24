import React, { useState, useEffect } from "react";
import { View,
     Text, 
     ScrollView, 
     StyleSheet, 
     TouchableOpacity, 
     Image ,
     ActivityIndicator, 
     SafeAreaView , 
     Alert,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { URL } from "../utils/constants";
import { useSelector } from "react-redux";


export default function MyOrder({navigation}) {

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

            // if(!result.ok) 
            //     setloading(false)
            //     throw new Error(await result.json())
            if(result){
                setloading(false)
                result = await result.json();
                setData(result.reverse());

            }
            
        }
        catch (error) {
            Alert.alert("Something Went Wrong, Please Try Again")
            setloading(false)
            console.log(JSON.stringify(error, null, 2), 'in error');
            console.log(error?.response?.data?.message || error.message, 'in error');
           
        }
    }

    // ******************************* API for delete API **************************************


    const RemoveOrders = async (id) => {
        try {
            console.log("ID",id)
            const url = URL + `/orders/delete/${id}`;
            let result = await fetch(url,
                {
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
            <SafeAreaView style={{flex:1}}>
                  
                  <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                  >
                <View style={style.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons style={{ fontSize: 28, color: 'black', right: 100 }} name="arrow-back" />
                    </TouchableOpacity>
                    <Text style={style.headertitle}>My Order</Text>
                </View>
               
                    {
                        loading ?
                        <ActivityIndicator size="large" color="#6CC51D" style={{ marginTop: 40 }} />
                         : <View style={style.cardsection}>
                         {
                             data.length ?
                                 data.map((item, index) => {
                                    
                                     return (
                                        
                                         <View key={index} >
                                             <View style={style.card}>
 
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
                                                        if(show){
                                                            setShow();
                                                        }
                                                        else{
                                                            setShow(item.orderId);
                                                        }
                                                         
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
                                                             <View key={index}>
                                                                 <View style={style.productcontainer}>
                                                                     <View style={style.leftcontent}>
                                                                         <View style={style.imagebg}>
                                                                             <Image style={{ height: 65, width: 65, resizeMode: 'stretch' }} source={{ uri: imgurl + productitem.images }} />
                                                                         </View>
                                                                         <View>
                                                                             <Text style={style.price}>Rs {productitem.totalPrice}</Text>
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
                    }
                   
           
                </ScrollView>

       
            </SafeAreaView>
    )
}

const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 22,
        position:'static',
        paddingHorizontal: 18,
        
    },
    headertitle: {
        fontSize: 22,
        fontWeight: '600',
        right: 20
    },
    cardsection: {
        margin: 20,
        gap: 20,
        borderRadius:10
    },
    card: {
        backgroundColor: 'white',
        padding: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius:8
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
        height:120,
        borderRadius:6
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