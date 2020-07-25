import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';
import UserCard from './Sections/UserCard';

//props.리듀서 이름을 가지고 redux state에 접근 가능
const CartPage= (props)=>{
    const dispatch = useDispatch();
    const [TotalPrice,setTotalPrice] = useState(0);
    const {user : {userData}} = props;
    useEffect(()=>{
        let cartItems = [];
        if (userData && userData.cart) {
            if (userData.cart.length >0) {
                userData.cart.forEach((item)=>{
                    cartItems.push(item.id);
                    dispatch(getCartItems(cartItems,userData.cart))
                        .then(response=>calcTotalPrice(response.payload))
                })
            }
        }
    },[userData])

    const calcTotalPrice = (cartList)=>{
        console.log('cartList:',cartList)
        let priceSum = 0;
        cartList.forEach((cartItem,index)=>{
            priceSum += cartItem.price * cartItem.quantity
        })
        setTotalPrice(priceSum);
    }
    return (
        <div style={{width:'85%',margin:'3rem auto'}}>
            <h1>My cart</h1>
            <UserCard productInfo={props.user.cartDetail} />
            <div className='total_price_container'>
                Total Amount : ${TotalPrice}
            </div>
        </div>
    )
}

export default CartPage;