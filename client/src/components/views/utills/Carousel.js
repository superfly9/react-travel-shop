import React from 'react';
import {Carousel} from 'antd';

const CarouselComponent = (props)=>{
    console.log(props.images)
    return (
        <Carousel autoplay>
            {props.images.map((image,index)=>(
                <img key={index} src={`http://localhost:5000/${image}`}/>
            ))}
        </Carousel>
    )
}

export default CarouselComponent;