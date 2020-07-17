import React,{useState} from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
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
                    console.log(response.data.filePath)
                    setImages([...Images,response.data.filePath]);
                    props.setImageFunction([...Images,response.data.filePath]);
                } else {
                    alert('이미지 업로드에 실패했습니다.')
                }
            })
    }
    const deleteImage = (image)=>{
        console.log('Seouls')
        const currentIndex = Images.indexOf(image);
        console.log(currentIndex);
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
                        {/* 여기에 +아이콘 넣어주기 */}
                    </div>
                )}
            </Dropzone>
            <div className='thumbnail_container'>
                {Images.map((item,index)=>(
                    <img onClick={()=>{deleteImage(item)}} className='thumbnail' key={index} src={`http://localhost:5000/${item}`}/>
                ))}
                </div>
            
        </div>
    )
}

export default FileUpload;