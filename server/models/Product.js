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
    continents : {
        type: Number,
        default :1
    },
    images : {
        type :Array,
        default : []
    }
},{timestamps:true})
ProductSchmea.index({
    title : 'text',
    description : 'text'
},{
    weights : {
        title :5,
        description :1
    }
});


const Product = mongoose.model('Product',ProductSchmea);

module.exports = {Product};