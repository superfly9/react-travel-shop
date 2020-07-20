import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import './LandingPage.css';
import {continents,price} from './Sections/Datas';
import CheckBoxComponent from './Sections/CheckBox';
import RadioBoxComponent from './Sections/RadioBox';


function LandingPage() {
    const [Products,setProducts]=useState([]);
    const [Skip,SetSkip]=useState(0);
    const [Limit,SetLimit]=useState(8);
    const [ProductInfoLength,SetProductInfoLength]=useState(0);
    const [Filters,setFilters] = useState({
        continents : [],
        price :[]
    });
    useEffect(()=>{
        let body = {
            skip : Skip,
            limit :Limit
        }
        getProducts(body);
    },[]);
    const getProducts =(body)=>{
        Axios.post('/api/product/products',body).then(response=>{
            if (response.data.success) {
                if (body.loadMore) {
                    setProducts([...Products,...response.data.productInfo]);
                } else {
                    setProducts([...response.data.productInfo]);
                }
            } else { 
                alert('상품정보를 가져오는 데 실패했습니다.')
            }
            SetProductInfoLength(response.data.productInfoLength);
        })
    }
    const loadMoreHandler = ()=>{
        let skip = Skip + Limit;
        let body={
            skip,
            limit:Limit,
            loadMore : true
        }
        getProducts(body);
        SetSkip(skip);
    }

    const showFilteredResults = (filters)=>{
        let body = {
            skip : 0,
            limit : Limit,
            filters
        }
        getProducts(body)
        SetSkip(0)
    }

    const handlePrice = (value)=>{
        const data = price;
        let array =[];
        for (let key in data) {
            data[key]._id === parseInt(value) ? array = data[key].array : console.log('pass');
        }
        return array;
    }

    const handleFilters = (filters,category) =>{
        const newFilters = {...Filters}
        newFilters[category] = filters;
        //filters = [1,2,3];
        if (category === 'price') {
            let priceValues=handlePrice(filters);
            newFilters[category] = priceValues;
        }
        console.log('newFilters:',newFilters)
        showFilteredResults(newFilters);
        setFilters(newFilters);
    }
    const renderCard = Products.map((item,index)=>{
      return (
        <div key={index} className='card'>
            <img className='product_img' src={`http://localhost:5000/${item.images[0]}`} />
            <span className='product_description'>{item.description}</span>
            <span className='product_price'>{item.price}</span>
        </div>
      )  
    })
    return (
     <div className='landingpage_container'>
        <h2 className='landingpage_title'>Let's travel Anywhere</h2>  
        <div>
            <CheckBoxComponent list={continents} handleFilters={filters=>handleFilters(filters,'continents')} />
            <RadioBoxComponent list={price} handleFilters={filters=>handleFilters(filters,'price')} />
        </div>
        <div className='card_container'>
            {renderCard}
        </div>
        <div className='btn_container'>
            {ProductInfoLength>Limit&&<button onClick={loadMoreHandler}>더보기</button>}
        </div>
     </div>
    )
}

export default LandingPage
