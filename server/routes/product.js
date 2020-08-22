const express = require('express');
const productRouter = express.Router();
const multer = require('multer');
const multerS3=require('multer-s3');
const AWS = require('aws-sdk');
const {Product} =  require('../models/Product');
const path = require('path');


const s3 = new AWS.S3();

const upload =multer({
  storage : multerS3({
    s3,
    bucket:'seoul-shopping',
    acl:'public-read',
    key : function (req,file,cb) {
        let extension = path.extname(file.originalname);
        cb(null,`${Date.now().toString()}${extension}`)
    }
  })
});

productRouter.post('/image',upload.single('files'),(req,res)=>{
    console.log(req.file)
    const { file:{location:filePath}} = req;
    if (filePath) {
        return res.json({success:true,filePath});
    } 
    res.json({success:false});
})
// 업로드 페이지에서 전달하는 상품의 정보들을 저장
productRouter.post('/save',async (req,res)=>{
  const product=await new Product(req.body);
  product.save((err,productInfo)=>{
    if (err) return res.json({success:false,err});
    res.json({success:true})
  })
})
// DB에 저장된 상품 정보들을 불러옴
productRouter.post('/products',async (req,res)=>{
  
  let {limit,skip,filters,searchTerm:term} = req.body;
  limit = limit ? parseInt(limit) : 20;
  skip = skip ? parseInt(skip) : 0;
  let findArgs = {};
  for (let key in filters) {
    if (filters[key].length > 0) {
      // console.log('filters:',filters,filters[key])
      //filters {continents : [4], price:[240,279]}
      if (key === 'price') {
        findArgs[key] = {
          $gte : filters[key][0],
          $lte :filters[key][1]
        }
      } else {
        findArgs[key] = filters[key];
      }
    } 
  }
  if (term) {
    await Product.find(findArgs)
    .find({description :new RegExp(term, 'i')})
    .populate('writer')
    .skip(skip)
    .limit(limit)
    .exec((err,productInfo)=>{
      if (err) return res.json({success:false,err})
      res.json({
        success:true,
        productInfo,
        productInfoLength:productInfo.length
      })
    })
  } else {
    await Product.find(findArgs)
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err,productInfo)=>{
        if (err) return res.json({success:false,err})
        res.json({
          success:true,
          productInfo,
          productInfoLength:productInfo.length
        })
      })
  }

})

productRouter.get('/products_by_id',async (req,res)=>{
  let {id:productId,type} = req.query;
  if (type === 'array') {
    let ids = productId.split(',');
    productId = ids.map((item)=>item);
  }
  console.log('productId:',productId)
  Product.find({_id:{$in : productId}})
    .populate('writer')
    .exec((err,productInfo)=>{
      if (err) return res.json({success:false})
      console.log('product_by_Id:',productInfo);
      res.send(productInfo)
    })
})


module.exports = productRouter;