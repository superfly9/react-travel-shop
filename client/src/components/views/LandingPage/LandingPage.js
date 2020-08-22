import React, { useEffect, useState, Fragment } from 'react'
import Axios from 'axios';
import './LandingPage.css';
import {continents,price} from './Sections/Datas';
import CheckBoxComponent from './Sections/CheckBox';
import RadioBoxComponent from './Sections/RadioBox';
import SearchComponent from './Sections/Search';
import CarouselComponent from '../utills/Carousel';


function LandingPage() {
    const [Products,setProducts]=useState([]);
    const [Skip,setSkip]=useState(0);
    const [Limit,setLimit]=useState(8);
    const [ProductInfoLength,setProductInfoLength]=useState(0);
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
            setProductInfoLength(response.data.productInfoLength);
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
        setSkip(skip);
    }

    const showFilteredResults = (filters)=>{
        let body = {
            skip : 0,
            limit : Limit,
            filters
        }
        getProducts(body)
        setSkip(0)
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
        if (category === 'price') {
            let priceValues=handlePrice(filters);
            newFilters[category] = priceValues;
        }
        showFilteredResults(newFilters);
        setFilters(newFilters);
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
    const renderCard = Products.map((item,index)=>{
      return (
        <div className='card_item'  key={index}>
            <a href={`/product/${item._id}`}><CarouselComponent key={index} images={item.images} /></a>
            <span className='product_description'>{item.description}</span>
            <span className='product_price'>{priceChange(String(item.price))}원</span>
        </div>
      )  
    })
    const searchUpadate = (searchTerm)=>{
        const body ={
            skip : 0,
            limit :Limit,
            filters:Filters,
            searchTerm
        }
        setSkip(0);
        getProducts(body);
    }
    return (
     <div className='landingpage_container'>
        <h2 className='landingpage_title'>어디든 떠나볼까요!</h2>  
        <div className='filter_components'>
            <CheckBoxComponent list={continents} handleFilters={filters=>handleFilters(filters,'continents')} />
            <RadioBoxComponent list={price} handleFilters={filters=>handleFilters(filters,'price')} />
        </div>
        <div className='search_container'>
            <SearchComponent searchUpdate={searchUpadate} />
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
