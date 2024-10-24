import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens'

import LoginScreen from './screens/login';
import Welcome from './screens/welcome';
import Signup from './screens/signup';
import HomeScreen from './screens/homeScreen';
import TabbarNavigationContainer from './screens/navigation';
import Description from './screens/productdeatils';
import Categories from './screens/categories';
import Splash1 from './screens/splash1';
import Splash2 from './screens/splash2';
import Splash3 from './screens/splash3';
import Splash4 from './screens/splash4';
import Cart from './screens/cart';
import Payment from './screens/paymentmethod';
import OrderSuccess from './screens/ordersccess';
import TrackOrder from './screens/trackorder';
import ForgotPassword from './screens/forgotpassword';
import VerifyPhone from './screens/verifyphone';
import OtpScreen from './screens/otpscreen';
import ShippingAddress from './screens/shippingaddress';
import ShippingMethod from './screens/shippingmethod';
import Notification from './screens/notification';
import Aboutme from './screens/aboutme';
import Transaction from './screens/transaction';
import Addaddress from './screens/addaddress';
import Fevourite from './screens/fevourite';
import MyCards from './screens/mycards';
import Addcards from './screens/addcard';
import Vegetables from './screens/allproducts';
import MyOrder from './screens/myorder';
import OrderFailed from './screens/orderfailed';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName='splash1'
      screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen name="splash1" component={Splash1}/>
        <Stack.Screen name="splash2" component={Splash2}/>
        <Stack.Screen name="splash3" component={Splash3}/>
        <Stack.Screen name="splash4" component={Splash4}/>
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="home" component={HomeScreen}/>
        <Stack.Screen name="describe" component={Description}/>
        <Stack.Screen name="Main" component={TabbarNavigationContainer} />
        <Stack.Screen name="category" component={Categories}/>
        <Stack.Screen name="vegetable" component={Vegetables}/>
        <Stack.Screen name="cart" component={Cart}/>
        <Stack.Screen name='payment' component={Payment}/>
        <Stack.Screen name='ordersuccess' component={OrderSuccess}/>
        <Stack.Screen name='track' component={TrackOrder}/>
        <Stack.Screen name='forgot' component={ForgotPassword}/>
        <Stack.Screen name='verifyphone' component={VerifyPhone}/>
        <Stack.Screen name='otpscreen' component={OtpScreen}/>
        <Stack.Screen name='shippingaddress' component={ShippingAddress} />
        <Stack.Screen name='shipmethod' component={ShippingMethod}/>
        <Stack.Screen name='notification' component={Notification}/>
        <Stack.Screen name='aboutme' component={Aboutme}/>
        <Stack.Screen name='transaction' component={Transaction}/>
        <Stack.Screen name='addaddress' component={Addaddress}/>
        <Stack.Screen name='fevourite' component={Fevourite}/>
        <Stack.Screen name='mycards' component={MyCards}/>
        <Stack.Screen name='addcard' component={Addcards}/>
        <Stack.Screen name='order' component={MyOrder}/>
        <Stack.Screen name='failed' component={OrderFailed}/>

      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
