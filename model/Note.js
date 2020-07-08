const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new Schema({
        id:Schema.Types.ObjectId,
        userName:String,
        income:Number,
        expent:Number,
        createDate:{type: Date, default:Date.now()},
        type:Number
});

mongoose.model('Note',noteSchema);