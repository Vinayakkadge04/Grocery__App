import React  from "react";
import {View, Text, StyleSheet , TouchableOpacity, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function VerifyPhone({navigation}){
    return (
       <View style={style.body}>
             <View style={style.header}>
                <TouchableOpacity onPress={()=>navigation.navigate('forgot')}>
                         <Ionicons style={{fontSize:34,color:'black',right:60}} name="arrow-back"/>
                </TouchableOpacity>  
                <Text style={style.headertitle}>Password Recovery</Text>
            </View>

            <View style={[style.body,{top:-60}]}>
                    <Text style={style.title}>Verify your number</Text>
                    <Text style={style.subtitle}>Lorem ipsum dolor sit amet, consetetur {'\n'}sadipscing elitr, sed diam nonumy</Text>
                    <View style={style.textbox}>
                        <Ionicons style={style.icon} name="call-outline"/>
                        <Text>+91</Text>
                        <TextInput style={{fontSize:18}} placeholder="Enter number"/>
                    </View>
                    <TouchableOpacity onPress={()=>{navigation.navigate('otpscreen')}}>
                        <View style={style.butn}>
                            <Text style={{color:'white', fontSize:20,fontWeight:'600'}}>Send Link</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{fontSize:16,fontWeight:'300',marginTop:20}}>Resend confirmation code (1:23)</Text>
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