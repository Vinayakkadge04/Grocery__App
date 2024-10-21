import React  from "react";
import {View, Text, StyleSheet , TouchableOpacity, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OTPTextView from "react-native-otp-textinput";

export default function OtpScreen({navigation}){
    return (
       <View style={style.body}>
             <View style={style.header}>
                <TouchableOpacity onPress={()=>navigation.navigate('verifyphone')}>
                         <Ionicons style={{fontSize:34,color:'black',right:60}} name="arrow-back"/>
                </TouchableOpacity>  
                <Text style={style.headertitle}>Password Recovery</Text>
            </View>

            <View style={[style.body,{top:-60}]}>
                    <Text style={style.title}>Verify your number</Text>
                    <Text style={style.subtitle}>Enter your OTP code below</Text>
                    <OTPTextView textInputStyle={{backgroundColor:'white',borderBottomWidth:0}}/>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                        <View style={style.butn}>
                            <Text style={{color:'white', fontSize:20,fontWeight:'600'}}>Next</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{fontSize:16,fontWeight:'300',marginTop:20}}>Don't receive the code?</Text>
                    <Text style={{fontSize:16,fontWeight:'500'}} >Resend a new code</Text>
            </View>
       </View>
    );
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
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    container:{
        flex:1,
        
    },
    title:{
        fontSize:26,
        fontWeight:'700',
        textAlign:'center',
        marginVertical:10
    } ,
    subtitle:{
        fontSize:18,
        fontWeight:'400',
        textAlign:'center',
        color:'grey',
        marginBottom:20
    },
    textbox:{
      backgroundColor:'white',
      padding:14,
      alignItems:'center',
      shadowColor:'black',
      shadowOffset:{height:2,width:2},
      shadowOpacity:0.2,
      marginTop:10,
      display:'flex',
      flexDirection:'row',
      borderRadius:6,
      alignSelf:'stretch',
      gap:10,
      width:390
    },
    icon:{
        fontSize:23,
        color:'grey'
    },
    butn:{
        backgroundColor:"#6CC51D",
        padding:17,
        alignItems:'center',
        borderRadius:5,
        shadowColor:'black',
        shadowOffset:{height:2,width:2},
        shadowOpacity:0.2,
        marginTop:10,
        width:390
      },
})