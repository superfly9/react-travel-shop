const express = require('express');
const productRouter = express.Router();
const multer = require('multer');
const {Product} =  require('../models/Product');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log('file:',file)
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
const upload = multer({ storage }).single('files')

productRouter.post('/image',upload,(req,res)=>{
    const { filename,path:filePath} = req.file;
    if (filename && filePath) {
        return res.json({success:true,filename,filePath});
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
  console.log('findArgs:',findArgs);
  if (term) {
    await Product.find(findArgs)
    .find({$text : {$search : term}})
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