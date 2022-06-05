/* const mongoose = require("mongoose");

mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, {useNewUrlParser: true, useUnifiedTopology: true})

const schemaAction = new mongoose.Schema ({
    date: {type: Date, default: Date.now, required: true},
    action_type: {  phone: {type: Boolean, default: true, required: true}, 
                    meeting: {type: Boolean, default: false, required: true}, 
                    another: {type: String},
                 },
    action_description: {type: String, required: true},
    
});
 
module.exports = mongoose.model('Action', schemaAction); */