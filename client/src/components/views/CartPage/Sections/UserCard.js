import React, { useState } from 'react';
import './UserCard.css';
const UserCard = (props)=>{
    const { productInfo } = props;

    const renderImages = (images)=>{
        if (images.length >0) {
            return `http://localhost:5000/${images[0]}`;
        }
    }
    const renderItems =productInfo && productInfo.map((productItem,index)=>(
        <tr key={index}>
            <td>
                <img src={renderImages(productItem.images)} alt='product'/>
            </td>
            <td>{productItem.quantity} EA</td>
            <td>$ {productItem.price}</td>
            <td>
                <button onClick={()=>props.removeItem(productItem._id)}>Remove</button>
            </td>
        </tr>
    ))
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems}
                </tbody>
            </table>
        </div>
    )
}

export default UserCard;