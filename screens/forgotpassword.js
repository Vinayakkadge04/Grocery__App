import React, { useState }  from "react";
import {View, Text, StyleSheet , TouchableOpacity, TextInput , ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { URL } from "../utils/constants";


export default function ForgotPassword(props){
    const [email , setemail] = useState(""); 
    const [password, setPassword] = useState("");
    const updatePassword = async() =>{
          
        try {
            const url = URL + "/customer/forgotpassword";
            const result = await axios.put(url, {
              customerEmail:email,
              customerPassword:password
            },
            {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                
            }
        );
            
            console.log(result.data);
            if (result.status === 200) {
              props.navigation.navigate('Login')
            }
          } catch (error) {
            console.log(JSON.stringify(error, null,2));
            
            console.log(error?.response?.data?.message || error.message);
          }
    }



    return (
       <View style={style.body}>
             <View style={style.header}>
                <TouchableOpacity onPress={()=>props.navigation.navigate('Login')}>
                         <Ionicons style={{fontSize:34,color:'black',right:30}} name="arrow-back"/>
                </TouchableOpacity>  
                <Text style={style.headertitle}>Password Recovery</Text>
            </View>
            <ScrollView>
            <View style={[style.body,{top:60}]}>
                    <Text style={style.title}>Forgot Password</Text>
                    <Text style={style.subtitle}> We’ll help you reset it—just enter your email! and New Password</Text>
                    <View style={style.textbox}>
                        <Ionicons style={style.icon} name="mail-outline"/>
                        <TextInput style={{ fontSize: 17 ,flex:1}}
                        onChangeText={(text) => setemail(text)}
                         placeholder="Email Address"/>
                    </View>
                    <View style={style.textbox}>
                        <Ionicons style={style.icon} name="lock-closed-outline"/>
                        <TextInput style={{ fontSize: 17 ,flex:1}}
                        onChangeText={(text) => setPassword(text)}
                         placeholder="New Password"/>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        updatePassword();
                    }}>
                        <View style={style.butn}>
                            <Text style={{color:'white', fontSize:18,fontWeight:'600'}}>Update</Text>
                        </View>
                    </TouchableOpacity>
            </View>
            </ScrollView>
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
      width:350,
      marginHorizontal:20
      
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
        alignSelf:'stretch',
        width:350,
      },
})