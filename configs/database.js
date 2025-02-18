const { default: mongoose } = require("mongoose");


mongoose.connect('mongodb+srv://bhavinipatel7532:12345@cluster0.hhalg.mongodb.net/book-store');

const db = mongoose.connection;

db.on('connected',(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('Database Connected');
    }
})

module.exports = db;