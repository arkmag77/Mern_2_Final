const Customer = require('../models/Customer');

function customerList(cb) {
    Customer.find().lean().exec(function (err, customers) {
        if (err) {
            cb(err);
        } else {
            cb(err, customers);
        }
    })
}


function customerGet(id, cb) {
    Customer.findById(id).exec(function (err, customer) {

        if (err) {
            cb(err);
        } else {
            cb(null, customer);
        }

    })
}

function customerAdd(data, cb) {

    let newCustomer = new Customer(data)

    newCustomer.save(function (err, customer) {

        if (err) {
            cb(err);
        } else {
            cb(null, customer);
        }

    });
}

function customerUpdate(id, data, cb) {
    Customer.updateOne({ _id: id }, data, function (err, customer) {

        if (err) {
            cb(err);
        } else {
            cb(null, customer);
        }

    });
}

function customerUpdateByAction(id, data, cb) {
    Customer.updateOne({ _id: id }, data, { runValidators: true }, function (err, customer) {

        if (err) {
            cb(err);
        } else {
            cb(null, customer);
        }

    });
}

function customerDeleteAction(id, a_id, cb) {
    Customer.findById({ _id: id }, function (err, customer) {
        if (!err) {

            customer.actions.id(a_id).remove();
            customer.save(function (err) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, customer);
                }
          });
        }

    });
}



function customerDelete(id, cb) {
    Customer.deleteOne({ _id: id }, function (err, customer) {
        if (err) {
            cb(err);
        } else {
            cb(null, customer);
        }
    });
}

module.exports = {
    list: customerList,
    get: customerGet,
    add: customerAdd,
    update: customerUpdate,
    updateByAction: customerUpdateByAction,
    deleteAction: customerDeleteAction,
    delete: customerDelete
}