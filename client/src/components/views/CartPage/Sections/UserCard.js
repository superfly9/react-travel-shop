import React from 'react';
import './UserCard.css';
const UserCard = (props)=>{
    const { productInfo } = props;
    const renderImages = (images)=>{
        if (images.length >0) {
            return images[0];
        }
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
    const renderItems =productInfo && productInfo.map((productItem,index)=>(
        <tr key={index}>
            <td>
                <a href={`/product/${productItem._id}`}> 
                    <img className='cart_img' src={renderImages(productItem.images)} alt='product'/>
                </a>
            </td>
            <td>{productItem.quantity} 개</td>
            <td>{priceChange(String(productItem.price))}원</td>
            <td>
                <button className='cart_remove_btn' onClick={()=>props.removeItem(productItem._id)}>카트에서 없애기</button>
            </td>
        </tr>
    ))
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>상품 이미지</th>
                        <th>상품 개수</th>
                        <th>상품 가격</th>
                        <th>제거하기</th>
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