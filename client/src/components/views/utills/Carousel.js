import React from 'react';
import {Carousel} from 'antd';
import './Carousel.css';

const CarouselComponent = (props)=>{
    return (
        <Carousel>
            {props.images.map((image,index)=>(
                <img className='carousel_img' key={index} src={image}/>
            ))}
        </Carousel>
    )
}

export default CarouselComponent;