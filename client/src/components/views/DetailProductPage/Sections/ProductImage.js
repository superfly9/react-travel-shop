import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

const ProductImage=(props)=>{
    const [Images,setImages]=useState([]);

    useEffect(()=>{
        if (props.detail.images && props.detail.images.length > 0) {
            let imageArr = [];
            props.detail.images.forEach((item,index)=>{
                imageArr.push({
                    original:`http://localhost:5000/${item}`,
                    thumbnail:`http://localhost:5000/${item}`
                })
            })
            setImages(imageArr);
        }
    },[props.detail])
    return (
        <div className='image_container'>
            <ImageGallery items={Images}/>
        </div>
    )
}

export default ProductImage;