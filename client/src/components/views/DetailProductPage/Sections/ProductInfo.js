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
    const priceChange =(str)=>{
        let result =str.split('').reverse()
          .map((item,index)=>{
            if (index%3===2&&index!==str.split('').length-1) {
              item=`,${item}`
            }
            return item;
          }).reverse().join('')
        return result;
    }
    return (
        <div className='item_container'>
            <h2 className='item_title'>상품 정보</h2>
            <div className='item_info'>
                <span><strong>가격: </strong>{priceChange(String(props.detail.price))}원</span>
                <span><strong>판매량: </strong>{props.detail.sold}</span>
                <span><strong>조회수: </strong>{props.detail.views}</span>
            </div>
            <p className='item_description'>
                {props.detail.description}
            </p>
            {userId ?
                <button className='add_cart_btn' onClick={clickAddToCart}>장바구니에 추가</button>
                :
                <p>카트에 추가하려면 로그인을 하세요</p>
            }
        </div>
    )
}

export default ProductInfo;