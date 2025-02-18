const { default: mongoose } = require("mongoose");


const adminSchema = new mongoose.Schema({
    username : {
        require : true ,
        type : String,
    },
    email : {
        require : true ,
        type : String,
    },
    password : {
        require : true ,
        type : String,
    }
},{timestamps : true});

const adminModel = mongoose.model("adminModel",adminSchema);

module.exports = adminModel;