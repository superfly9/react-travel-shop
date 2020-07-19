import React,{useEffect,useState} from 'react';
import Axios from 'axios';
import FileUpload from '../utills/FileUpload';
import './ProductUploadPage.css';

const ProductUploadPage = (props)=>{
    const contientInfo = [
        {key:1,value:'Asia'},
        {key:2,value:'Europe'},
        {key:3,value:'Africa'},
        {key:4,value:'Australia'},
        {key:5,value:'North America'},
        {key:6,value:'South America'},
        {key:7,value:'Antarctica'}
    ]
    const [Title,setTitle]=useState('');
    const [Description,setDescription]=useState('');
    const [Price,setPrice]=useState(0);
    const [Continent,setContinent]=useState(1);
    const [Images,setImages]=useState([]);

    const handleInputChange = (e)=>{
        const target = e.currentTarget;
        const value = target.value;
        switch (target.name)  {
            case 'title':
                setTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'price':
                setPrice(value);
                break;
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (!Title||!Description||!Price||!Continent||!Images) {
            alert('모든 값을 넣어야 합니다.');
        }
        const submitData = {
            writer : props.user.userData._id,
            title: Title,
            description:Description,
            price: Price,
            continents :Continent,
            images : Images
        }
        Axios.post('/api/product/save',submitData)
            .then(response=>{
                if (response.data.success) {
                    alert('상품 업로드에 성공했습니다.')
                    props.history.push('/');
                } else {
                    alert('상품 저장에 실패했습니다.')
                }
            })
    }
    const continentChangeHandler =(e)=>{
        setContinent(e.currentTarget.value);
    }

    const setImageFunction = (images)=>{
        setImages(images);
        console.log(images,'from Child');
    }

    return (
        <div className='upload_container'>
            <h2>여행 상품 업로드</h2>
            <form onSubmit={handleSubmit}>
                <FileUpload setImageFunction={setImageFunction} />
                <br />
                <label htmlFor='title'>이름</label>
                <input name='title' id='title' value={Title} onChange={handleInputChange} />
                <br />
                <label htmlFor='description'>설명</label>
                <textarea name='description' id='description' value={Description} onChange={handleInputChange} />
                <br />
                <label htmlFor='price'>가격($)</label>
                <input name='price' id='price' value={Price} onChange={handleInputChange}></input>
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {contientInfo.map((item)=>(
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <button type='submit'>확인</button>
            </form>
        </div>
    )
}

export default ProductUploadPage;