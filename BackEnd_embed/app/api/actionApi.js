const express = require("express");
const router = express.Router();
 
const action = require('../controllers/action.controller');
const auth = require('../middlewares/authorize');


router.get('/all', auth, function (req, res){

    action.list(function(err, actions){

        if (err) {
            res.status(404);
            res.json({
               error:  'Actions not found'
            });
        } else {

            res.json(actions);
        }
    });
   
});


router.get('/:id', function (req, res){

    action.get(req.params.id, function(err, action){

        if (err) {
            res.status(404);
            res.json({
               error:  'Action not found'
            });
        } else {
            res.json(action);
        }

    });
   
});


router.post('/add', /* auth, */ function (req, res){


    action.add(req.body, function(err, action){

        console.log("req.body", req.body);
        console.log("action", action);

        if (err) {

            console.log("error", err);

            res.status(404);
            res.json({
               error:  'Action not created'
            });
        } else {
            res.json(action);
        }

    });
   
});


/* router.put('/update/:id', function(req, res){
 
    customer.update(req.params.id, req.body, function(err, data){
        if (err) {
            res.status(404);
            res.json({
               error:  'Customer not found'
            });
        } else {
            res.json(data);
        }
    });
     
}); */


router.delete('/delete/:id', function(req, res){
     
    action.delete(req.params.id, function(err, data){
        if (err) {
            res.status(404);
            res.json({
               error:  'Action not found'
            });
        } else {
            res.json(data);
        }
    });
     
});

module.exports = router;