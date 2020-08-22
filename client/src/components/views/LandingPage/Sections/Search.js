import React,{useState} from 'react';
import {Input} from 'antd';

const {Search} = Input;


const SearchComponent =(props)=>{
    const [SearchTerm,setSearchTerm] = useState('');

    const handleSearchChange = (e)=>{
        const value = e.currentTarget.value;
        setSearchTerm(value);
        props.searchUpdate(value);
    }
    return (
        <div>
            <Search placeholder='제목으로 검색' onChange={handleSearchChange} value={SearchTerm} />
        </div>
    )
}


export default SearchComponent;