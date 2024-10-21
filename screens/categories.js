import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import { URL } from "../utils/constants";


export default function Categories(props) {

    const {token} = useSelector((state) => state.auth)
    const imgurl = URL+ '/'
    const [data, setData] = useState([]);
    const GetCategoty = async () => {
        const url = URL +'/categories';
        let result = await fetch(url,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }

        );
        result = await result.json();
        console.log(result.data)

        setData(result);
    }

    useEffect(() => {
        GetCategoty();
        
    }, []);

    return (
        <View>
            <View style={style.header}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Main')}>
                    <Ionicons style={{ fontSize: 34, color: 'black' }} name="arrow-back" />
                </TouchableOpacity>

                <Text style={style.headertitle}>Categories</Text>
                <Ionicons style={{ fontSize: 34, color: 'black' }} name="options-sharp" />
            </View>
            <ScrollView vertical>
            <View style={style.container}>
                
                    {
                        data.length ?
                            data.map((item , index) =>{
                               
                                return (                                
                                <TouchableOpacity key={index} onPress={()=>{
                                    props.navigation.navigate('vegetable',{title:item.categoryName,id:item.categoryId});
                                }}>
                                
                                <View style={style.category2}>
                                    <View style={[style.categoryImagebg, { backgroundColor: '#E6F2EA' }]}>
                                        <Image 
                                        style={{width: 100, height: 100 , resizeMode:"contain"}}
                                        source={{uri :imgurl+item.categoryImage}} />
                                    </View>
                                    <Text style={{ color: '#868889', fontSize: 20 }}>{item.categoryName}</Text>
                                </View>
                                </TouchableOpacity>
                            )}) : null
                    }
                     

                    {/* // <View style={style.category2}>
            //         <View style={[style.categoryImagebg,{backgroundColor:'#E6F2EA'}]}>
            //             <Image style={{transform:[{scale:1.5}]}} source={require('../assets/vege.png')}/>
            //         </View>
            //         <Text style={{color:'#868889',fontSize:20}}>Vegetables</Text>
            //     </View>

            //     <View style={style.category2}>
            //         <View style={[{backgroundColor:'#FFE9E5'},style.categoryImagebg]}>
            //             <Image style={{transform:[{scale:1.5}]}} source={require('../assets/apple.png')}/>
            //         </View>
            //         <Text style={{color:'#868889',fontSize:20}}>Fruits</Text>
            //     </View>

            //     <View style={style.category2}>
            //         <View style={[style.categoryImagebg,{backgroundColor:'#FFF6E3',}]}>
            //             <Image style={{transform:[{scale:1.5}]}} source={require('../assets/beverages.png')}/>
            //         </View>
            //         <Text style={{color:'#868889',fontSize:20}}>Beverages</Text>
            //     </View>

            //     <View style={style.category2}>
            //         <View style={[style.categoryImagebg,{backgroundColor:'#F3EFFA'}]}>
            //             <Image style={{transform:[{scale:1.5}]}} source={require('../assets/grocery.png')}/>
            //         </View>
            //         <Text style={{color:'#868889',fontSize:20}}>Grocery</Text>
            //     </View>

            //     <View style={style.category2}>
            //         <View style={[style.categoryImagebg,{backgroundColor:'#DCF4F5'}]}>
            //             <Image style={{transform:[{scale:1.5}]}} source={require('../assets/oil.png')}/>
            //         </View>
            //         <Text style={{color:'#868889',fontSize:20}}>Edible oil</Text>
            //     </View>

            //     <View style={style.category2}>
            //         <View style={[style.categoryImagebg,{backgroundColor:'#FFE8F2'}]}>
            //             <Image style={{transform:[{scale:1.5}]}} source={require('../assets/household.png')}/>
            //         </View>
            //         <Text style={{color:'#868889',fontSize:20}}>Household</Text>
            //     </View>

            //     <View style={style.category2}>
            //         <View style={[style.categoryImagebg,{backgroundColor:'#D2EFFF'}]}>
            //             <Image style={{transform:[{scale:1.5}]}} source={require('../assets/babycare.png')}/>
            //         </View>
            //         <Text style={{color:'#868889',fontSize:20}}>Babycare</Text>
            //     </View> */}

            
               
            </View>
            </ScrollView>
        </View>

    )
}
const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingTop: 60,
        paddingHorizontal: 18,
        marginBottom: 10

    },
    headertitle: {
        fontSize: 26,
        fontWeight: '600'
    },
    container: {

        flexWrap: 'wrap',
        justifyContent:'center',
        gap: 10,
        flexDirection: 'row',
        margin: 14,

    },
    category2: {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        margin: 10,
        width:120,
        backgroundColor: 'white',
        paddingVertical: 20
    },
    categoryImagebg: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 80,
        width: 80
    }
})