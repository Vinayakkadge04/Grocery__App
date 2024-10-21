import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./homeScreen";
import Fevourite from "./fevourite";
import Cart from "./cart";
import Profile from "./profile";

const Tab = createBottomTabNavigator();
export default function TabbarNavigationContainer(){
     
    return(
            <Tab.Navigator
                initialRouteName={HomeScreen}
                screenOptions={
                    ({route})=>({
                        headerShown:false,
                       tabBarShowLabel:false,
                        tabBarIcon:({focused , color , size}) => {
                            let iconName;
                            let rn = route.name;
                            if(rn === 'home'){
                                iconName = focused ? 'home' :'home-outline'
                            }else if(rn === 'fevourite'){
                                iconName = focused ? 'heart' : 'heart-outline'
                            }else if(rn === 'cart'){
                                iconName = focused ? 'cart' : 'cart-outline'
                            }else if(rn === 'profile'){
                                iconName = focused ? 'person' : 'person-outline'
                            }
                            return <Ionicons name={iconName} size={size} color={'#28B446'}/>
                        }})
                        }>
                <Tab.Screen name='home' component={HomeScreen}

                />
                <Tab.Screen name='cart' component={Cart}/>
                <Tab.Screen name='fevourite' component={Fevourite}/>
                <Tab.Screen name='profile' component={Profile}/>            
             </Tab.Navigator>
    )
}