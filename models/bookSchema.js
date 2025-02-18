const { default: mongoose } = require("mongoose");


const bookSchema = new mongoose.Schema({
    bookname :{
        type : String,
        require : true
    },
    author :{
        type : String ,
        require : true
    },
    price :{
        type : Number ,
        require : true
    },
    image : {
        type : String ,
        require : true
    },
    bestSeller : {
        type : Boolean
    },
    newCollection : {
        type : Boolean
    }
},{timestamps : true});


const BookModel = mongoose.model("bookModel",bookSchema);

module.exports = BookModel;