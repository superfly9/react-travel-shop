import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';

//props.리듀서 이름을 가지고 redux state에 접근 가능
const CartPage= (props)=>{
    const dispatch = useDispatch();
    const {user : {userData}} = props;
    useEffect(()=>{
        let cartItems = [];
        if (userData && userData.cart) {
            if (userData.cart.length >0) {
                userData.cart.forEach((item)=>{
                    cartItems.push(item.id);
                    dispatch(getCartItems(cartItems,userData.cart));
                })
            }
        }
    },[userData])
    return (
        <div>
            Cart
        </div>
    )
}

export default CartPage;