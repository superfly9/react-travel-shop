import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';
import UserCard from './Sections/UserCard';

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
        <div style={{width:'85%',margin:'3rem auto'}}>
            <h1>My cart</h1>
            <UserCard productInfo={props.user.cartDetail&&props.user.cartDetail.productInfo} />
        </div>
    )
}

export default CartPage;