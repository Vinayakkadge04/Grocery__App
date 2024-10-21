import React , {useState} from 'react';
import { StyleSheet ,View , Text , TouchableOpacity, ImageBackground , Image, TextInput,Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import  AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

export default function Payment({navigation}){
    

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <View style={{flex:1}}>
            <View style={style.header}>
                <TouchableOpacity onPress={()=>navigation.navigate('cart')}>
                         <Ionicons style={{fontSize:34,color:'black',right:60}} name="arrow-back"/>
                </TouchableOpacity>  
                <Text style={style.headertitle}>Payment Method</Text>
            </View>
            <View style={{alignItems:'center',gap:20,flex:1}}>

                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <View>
                    <View style={style.circle}> 
                        <Ionicons style={style.icon} name='checkmark-sharp'/>
                    </View>
                    <Text style={style.smalltext}>Delivery</Text>
                </View>
                <View style={style.horizonline}></View>
                <View>
                    <View style={style.circle}> 
                        <Ionicons style={style.icon} name='checkmark-sharp'/>
                    </View>
                    <Text style={style.smalltext}>Address</Text>
                </View>
                <View style={style.horizonline}></View>
                <View>
                    <View style={style.circle}> 
                        <Text style={style.icon}>3</Text>
                    </View>
                    <Text style={style.smalltext}>Payment</Text>
                </View>
                </View>

                <View style={style.container}>
                    <View style={style.squarecard}>
                        <Ionicons style={style.cardicon} name='logo-paypal'/>
                        <Text style={style.smalltext}>Paypal</Text>
                    </View>

                    <View style={style.squarecard}>
                        <AntDesign style={style.cardicon} name='creditcard'/>
                        <Text style={style.smalltext}>Credit Card</Text>
                    </View>

                    <View style={style.squarecard}>
                        <Ionicons style={style.cardicon} name='logo-apple'/>
                        <Text style={style.smalltext}>Apple Pay</Text>
                    </View>

                </View>
                <View style={style.card}>
                    <ImageBackground style={style.cardbgimage} source={require('../assets/cardformat.png')}>
                        <Image style={{height:40,width:70}} source={require('../assets/master-logo.png')}/>
                        <Text style={{color:'white',fontSize:18,fontWeight:'600'}}>XXXX XXXX XXXX 5678</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View>
                                <Text style={{color:'white'}}>CARD HOLDER</Text>
                                <Text style={{color:'white',fontWeight:'600',fontSize:16}}>JORDEN PAREIRA</Text>
                            </View>
                            <View>
                                <Text style={{color:'white'}}>EXPIRES</Text>
                                <Text style={{color:'white',fontWeight:'600',fontSize:16}}>05/27</Text>
                            </View>
                        </View>
                    </ImageBackground>

                </View>
                <View style={{alignItems:'center', gap:10}}>
                    <View style={{width:400}}>
                        <View style={style.textbox}>
                            <EvilIcons size={39} color={'grey'} name='user'/>
                            <TextInput style={style.textin} placeholder='Name on the card'/>
                        </View>
                    </View>
                    <View style={{width:400,marginHorizontal:20}}>
                        <View style={style.textbox}>
                            <EvilIcons size={39} color={'grey'} name='credit-card'/>
                            <TextInput style={style.textin} placeholder='Card number'/>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', gap:10,marginHorizontal:14}}>
                        <View style={[style.textbox,{gap:5, flex:2}]}>
                                <Ionicons size={24} color={'grey'} name='calendar-clear-outline'/>
                                <TextInput style={style.textin} placeholder='Month/Year'/>
                        </View>
                        <View style={[style.textbox,{gap:5, flex:2}]}>
                                <Ionicons size={24} color={'grey'} name='lock-closed-outline'/>
                                <TextInput style={style.textin} placeholder='CVV'/>
                        </View>
                    </View>

                </View>
                <View style={{alignSelf:'stretch',gap:10}}>

                <View style={{flexDirection:'row',alignItems:'center',alignSelf: 'stretch',marginHorizontal:10}}>
                            <Switch
                                    style={{transform:[{scaleX:.8},{scaleY:.7}]}}
                                    trackColor={{ false: "#fffff", true: "#6CC51D" }}
                                    onValueChange={toggleSwitch}
                                    value={isEnabled} />
                        <Text>Save this card</Text>
                 </View>

                <TouchableOpacity onPress={()=>navigation.navigate('ordersuccess')}>
                 <View style={style.butn}>
                    <Text style={{color:'white', fontSize:18,fontWeight:'600'}}>Make a payment</Text>
                </View> 
                </TouchableOpacity>

                </View>
                
            </View>
            


        </View>
    );
}

const style = StyleSheet.create({
    container:{
      flexDirection:'row',
     
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        paddingVertical:15,
        paddingTop:60,
        paddingHorizontal:18,
        marginBottom:20,
        right:20
    },
    headertitle:{
        fontSize:26,
        fontWeight:'600',  
        
    },
    circle:{
        height:45,
        width:45,
        backgroundColor:'#6CC51D',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
        left:4
    },
    butn:{
        backgroundColor:"#6CC51D",
        padding:17,
        alignItems:'center',
        borderRadius:5,
        shadowColor:'black',
        shadowOffset:{height:2,width:2},
        shadowOpacity:0.2,
        alignSelf:'stretch',
        marginHorizontal:10
      },
    icon:{
        fontSize:25,
        fontWeight:'600',
        color:'white'
    },
    horizonline:{
        width:110,
        height:1,
        backgroundColor:'#6CC51D',
        bottom:10
    },
    smalltext:{
        color:'grey',
        fontSize:16
    },
    squarecard:{
        backgroundColor:'white',
        height:120,
        width:120,
        gap:10,
        alignItems:'center',
        justifyContent:'center',
        shadowColor:'black',
        shadowOpacity:0.1,
        shadowOffset:{height:1,width:1},
        shadowRadius:5,
        marginHorizontal:7
    },
    cardicon:{
        color:'grey',
        fontSize:35
    },
    card:{
        backgroundColor:'#6CC51D',
        alignSelf:'stretch',
        height:189,
        marginHorizontal:15,
        borderRadius:12,
    },
    cardbgimage:{
        padding:20,
        height:189,
        borderRadius:12,
        justifyContent:'space-between',
        alignSelf:'stretch',
        overflow: "hidden",
    },
    textbox:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        padding:20,
        borderRadius:8
    },
    textin:{
        color:'grey',
        fontSize:22
    }
})