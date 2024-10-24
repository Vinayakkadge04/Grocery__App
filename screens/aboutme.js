import React from "react";
import { StyleSheet , View , Text , TouchableOpacity ,TextInput,ScrollView, SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Aboutme({navigation}){


    return(
        <SafeAreaView>
        <ScrollView>
        <View style={{justifyContent:'space-between',flex:1}}>
            <View>
                <View style={style.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                        <Ionicons style={{ fontSize: 34, color: 'black', right: 80 }} name="arrow-back" />
                    </TouchableOpacity>
                    <Text style={style.headertitle}>About me</Text>
                </View>

                <View style={style.container}>
                    <Text style={style.title}>Personal Details</Text>
                    
                    <View style={[style.textBox,{justifyContent:'start'}]}>
                        <Ionicons name='person-outline' size={28} color={'#868889'}/>
                        <TextInput style={style.inputtext} placeholder='Jorder Pareira'/>
                    </View>

                    <View style={[style.textBox,{justifyContent:'start'}]}>
                        <Ionicons name='mail-outline' size={28} color={'#868889'}/>
                        <TextInput style={style.inputtext} placeholder='example@gmail.com'/>
                    </View>

                    <View style={[style.textBox,{justifyContent:'start'}]}>
                        <Ionicons name='call-outline' size={28} color={'#868889'}/>
                        <TextInput style={style.inputtext} placeholder='+91 1234567878'/>
                    </View>
                    
                </View>


                <View style={style.container}>
                    <Text style={style.title}>Change Password</Text>
                    
                    <View style={[style.textBox,{justifyContent:'start'}]}>
                        <Ionicons name='lock-closed-outline' size={28} color={'#868889'}/>
                        <TextInput style={style.inputtext} secureTextEntry={true} placeholder='Current password'/>
                    </View>

                    <View style={[style.textBox,{justifyContent:'start'}]}>
                        <Ionicons name='lock-closed-outline' size={28} color={'#868889'}/>
                        <TextInput style={style.inputtext} secureTextEntry={true} placeholder='New Password'/>
                    </View>

                    <View style={[style.textBox,{justifyContent:'start'}]}>
                        <Ionicons name='lock-closed-outline' size={28} color={'#868889'}/>
                        <TextInput style={style.inputtext} secureTextEntry={true} placeholder='Confirm Password'/>
                    </View>
                    
                </View>

            </View>
           
            <View>
                <TouchableOpacity onPress={()=>{navigation.navigate()}}>
                    <View style={style.butn}>
                        <Text style={{color:'white', fontSize:18,fontWeight:'600'}}>Save</Text>
                    </View>
            </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}
const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 30,
        // paddingTop: 60,
        paddingHorizontal: 18,

    },
    headertitle: {
        fontSize: 26,
        fontWeight: '600',
        right: 20
    },
    title:{
        fontSize:18,
        fontWeight:'600'
    },
    textBox:{
        backgroundColor:'white',
        
        alignItems:'center',
        justifyContent:'space-between',
        shadowColor:'black',
        shadowOffset:{height:2,width:2},
        shadowOpacity:0.2,
        marginTop:10,
        display:'flex',
        flexDirection:'row',
        borderRadius:4
      },
      container:{
        marginHorizontal:20
      },
      inputtext:{
        fontSize:20,
        marginLeft:10
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
        margin:20
      },
})