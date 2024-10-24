import React from 'react-native';
import { StyleSheet , View , Text , TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function TrackOrder({navigation}){
    return(
        <View>
            <View style={style.header}>
                <TouchableOpacity onPress={()=>navigation.navigate('Main',{ screen: 'home' })}>
                         <Ionicons style={{fontSize:34,color:'black',right:80}} name="arrow-back"/>
                </TouchableOpacity>  
                <Text style={style.headertitle}>Track Order</Text>
            </View>
            <View style={style.body}>
            <View style={[style.card,{marginBottom:20,borderBottomWidth:0}]}>
                <View style={style.iconbg} iconbg>
                    <Feather style={style.icon} name='package'/>
                </View>
                <View style={{gap:6}}>
                    <Text style={style.order}>Order #90787</Text>
                    <Text style={style.date}>Placed on October 19 2024</Text>
                    <View style={{flexDirection:'row' , gap:20}}>
                        <Text>Items: 10</Text>
                        <Text>Items: $16.90</Text>
                    </View>
                </View>
            </View>
            <View style={style.card}>
                <View style={style.iconbg}>
                    <FontAwesome5 style={style.icon} name='box-open'/>
                </View>
                <View style={{gap:6}}>
                    <Text style={style.order}>Order placed</Text>
                    <Text style={style.date}>October 21 2024</Text>
                </View>
            </View>

            <View style={style.card}>
                <View style={style.iconbg}>
                    <Feather style={style.icon} name='check-circle'/>
                </View>
                <View style={{gap:6}}>
                    <Text style={style.order}>Order Confirmed</Text>
                    <Text style={style.date}>October 21 2024</Text>
                </View>
            </View>

            <View style={style.card}>
                <View style={style.iconbg}>
                    <FontAwesome5 style={style.icon} name='route'/>
                </View>
                <View style={{gap:6}}>
                    <Text style={style.order}>Order Shipped</Text>
                    <Text style={style.date}>October 21 2024</Text>
                </View>
            </View>


            <View style={style.card}>
                <View style={style.iconbgpending}>
                    <MaterialCommunityIcons style={style.iconpending} name='truck-delivery-outline'/>
                </View>
                <View style={{gap:6}}>
                    <Text style={style.order}>Out for Delivery</Text>
                    <Text style={style.date}>Pending</Text>
                </View>
            </View>


            <View style={style.card}>
                <View style={style.iconbgpending}>
                    <Ionicons style={style.iconpending} name='checkmark-done-sharp'/>
                </View>
                <View style={{gap:6}}>
                    <Text style={style.order}>Order Delivered</Text>
                    <Text style={style.date}>Pending</Text>
                </View>
            </View>

            </View>
           
        </View>
    )
}

const style = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        paddingVertical:15,
        paddingTop:60,
        paddingHorizontal:18,
        marginBottom:20,
        top:0,
        alignSelf:'stretch',
        
    },
    headertitle:{
        fontSize:26,
        fontWeight:'600',  
        right:20
    },
    body:{
       paddingHorizontal:20,
      
    },
    iconbg:{
        borderRadius:40,
        height:80,
        width:80,
        backgroundColor:'#EBFFD7',
        alignItems:'center',
        justifyContent:'center'
    },
    iconbgpending:{
        borderRadius:40,
        height:80,
        width:80,
        backgroundColor:'#F5F5F5',
        alignItems:'center',
        justifyContent:'center'
    },

    icon:{
        fontSize:38,
        color:'#28B446'
    },
    iconpending:{
        fontSize:38,
        color:'#868889'
    },
    card:{
        flexDirection:'row',
        alignItems:'center',
        gap:20,
        backgroundColor:'white',
        padding:20,
        borderBottomColor:'grey',
        borderBottomWidth:0.5
    },
    order:{
        fontSize:18,
        fontWeight:'700',

    },
    date:{
        color:'grey'
    }
})