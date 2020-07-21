import React, { useEffect, useState } from 'react';

const ProductInfo=(props)=>{
    const [ProductInfo,setProductInfo] = useState({});
    useEffect(()=>{
        setProductInfo(props.detail)        
        console.log('at ProductInfo:',props.detail)
    },[props.detail])
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
        </div>
    )
}

export default ProductInfo;