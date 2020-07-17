const mongoose = require('mongoose');

const ProductSchmea = mongoose.Schema({
    writer : {
        ref:'User',
        type:mongoose.Schema.Types.ObjectId
    },
    title:{
        type : String,
        maxlength :50   
    },
    description :String,
    price : {
        type:Number,
        default :0
    },
    views : {
        type : Number,
        default : 0
    },
    sold : {
        type:Number,
        maxlength : 0,
        default : 0
    },
    images : {
        type :Array,
        default : []
    }
},{timestamps:true})



const Product = mongoose.model('Product',ProductSchmea);

module.exports = {Product};