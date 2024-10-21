import {configureStore} from '@reduxjs/toolkit'
import  authReducer  from './Authslice';
import customerReducer from './customerslice';

const store = configureStore({
    reducer:{
        auth: authReducer,
    }          
});
export default store;