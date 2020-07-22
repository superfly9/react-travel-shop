import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

const ProductInfo=(props)=>{
    const dispatch = useDispatch();
    const clickAddToCart = (e)=>{
        dispatch(addToCart(props.detail._id))
            .then(response=>{
                console.log('data from redux',response.payload);
            })            
    }
    return (
        <div className='item_container'>
            <h2 className='item_title'>ProductInfo</h2>
            <div className='item_info'>
                <span><strong>Price:</strong>{props.detail.price}</span>
                <span><strong>Sold:</strong>{props.detail.sold}</span>
                <span><strong>View:</strong>{props.detail.views}</span>
            </div>
            <p className='item_description'>
                {props.detail.description}
            </p>
            <button className='add_cart_btn' onClick={clickAddToCart}>Add to Cart</button>
        </div>
    )
}

export default ProductInfo;