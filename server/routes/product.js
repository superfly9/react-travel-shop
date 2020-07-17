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
productRouter.post('/save',async (req,res)=>{
  console.log('req.body:',req.body)
  const product=await new Product(req.body);
  console.log('productModel',product)
  product.save((err,productInfo)=>{
    if (err) return res.json({success:false,err});
    res.json({success:true})
  })
})

module.exports = productRouter;