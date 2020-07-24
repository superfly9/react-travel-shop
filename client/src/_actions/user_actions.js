import Axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS
} from './types';
import { USER_SERVER } from '../components/Config.js';

export async function registerUser(dataToSubmit){
    const request =await Axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export async function loginUser(dataToSubmit){
    const request =await Axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export async function auth(){
    const request =await Axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export async function logoutUser(){
    const request =await Axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export async function addToCart (id) {
    const body = {id};
    const request =await Axios.post(`${USER_SERVER}/addToCart`,body)
        .then(response=>response.data);
    return {
        type :ADD_TO_CART,
        payload :request
    }
}
export async function getCartItems (cartItems,userCart) {
    console.log('cartItems:',cartItems,'userCart',userCart);
    //userCart : id / date / quantity 
    const request = await Axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response=>{
            //response.data.productInfo => productInfo
            const {data : {productInfo}} = response;
            userCart.forEach((cartItem,index)=>{
                productInfo.forEach((productDetail,index)=>{
                    if (productDetail._id === cartItem.id) {
                        productDetail.quantity=cartItem.quantity;
                    }
                })
            })
            return response.data;
        })
    return {
        type : GET_CART_ITEMS,
        payload : request
    }
}