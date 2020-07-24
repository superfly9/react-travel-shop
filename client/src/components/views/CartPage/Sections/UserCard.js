import React from 'react';
import './UserCard.css';

const UserCard = (props)=>{
const { productInfo } = props;
console.log('productInfo:',productInfo);

    const renderImages = (images)=>{
        if (images.length >0) {
            return `http://localhost:5000/${images[0]}`;
        }
    }
    const renderItems =productInfo && productInfo.map((item,index)=>(
        <tr key={index}>
            <td>
                <img src={renderImages(item.images)} alt='product'/>
            </td>
            <td>{item.quantity} EA</td>
            <td>$ {item.price}</td>
            <td>
                <button>Remove</button>
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