const Action = require('../models/Customer');

function actionAdd(data, cb) {

    let newAction = new Action (data)
     
    console.log("data", data);

       newAction.save(function(err, action){

        if(err) {
            cb(err);
        } else {
            cb(null, action);
        }
 
        });
}

module.exports = {
    add: actionAdd,
}