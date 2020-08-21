import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

const ProductInfo=(props)=>{
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const {userData} = user;
    const userId = userData ? userData._id : null
    console.log(userData,userId)
    const clickAddToCart = (e)=>{
        dispatch(addToCart(props.detail._id))
            .then(response=>{
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
            {userId ?
                <button className='add_cart_btn' onClick={clickAddToCart}>Add to Cart</button>
                :
                <p>카트에 추가하려면 로그인을 하세요</p>
            }
        </div>
    )
}

export default ProductInfo;