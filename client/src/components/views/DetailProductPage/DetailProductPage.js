import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './DetailProduct.css';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';


const DetailProductPage = (props) =>{
    const [Product,setProduct] = useState({});
    const productId = props.match.params.productId;
    useEffect(()=>{
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response=>{
                if (response.data.success) {
                    setProduct(response.data.productInfo[0]);
                } else {
                    alert('상세 정보 가져오기에 실패했습니다.');
                }
            })
    },[]);
    return (
        <div className='detail_product_container'>
            <div className='detail_product_title'>
                <h2>{Product.title}</h2>
            </div>
            <div className='product_component_container'>
                {/* Image */}
                <ProductImage detail={Product} />
                {/* Info */}
                <ProductInfo detail={Product} />
            </div>
        </div>
    )
};

export default DetailProductPage;