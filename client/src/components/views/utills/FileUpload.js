import React,{useState} from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import './FileUpload.css';

const FileUpload = (props)=>{
    const [Images,setImages] = useState([]);
    const dropHandler=(file)=>{

        const formData = new FormData();
        const config = {
            header  : {'content-type':'multipart/form-data'}
        }
        formData.append('files',file[0]);

        Axios.post('/api/product/image',formData,config)
            .then(response=>{
                if (response.data.success) {
                    setImages([...Images,response.data.filePath]);
                    props.setImageFunction([...Images,response.data.filePath]);
                } else {
                    alert('이미지 업로드에 실패했습니다.')
                }
            })
    }
    const deleteImage = (image)=>{
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images]
        newImages.splice(currentIndex,1);
        setImages([...newImages]);
        props.setImageFunction([...newImages]);
    }
    return (
        <div className='dropzone_container'>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <div className='dropzone_content' {...getRootProps()}>
                        <input {...getInputProps()} />
                        <PlusOutlined  style={{fontSize:'3rem'}}/>
                    </div>
                )}
            </Dropzone>
            <div className='thumbnail_container'>
                {Images.map((item,index)=>(
                    <img onClick={()=>{deleteImage(item)}} className='thumbnail' key={index} src={item}/>
                ))}
                </div>
            
        </div>
    )
}

export default FileUpload;