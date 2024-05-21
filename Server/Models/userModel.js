const mongoose = require('mongoose');
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isSeller:{
        type:Boolean,
        default:false
    },
    password: {
        type: String,
        required: true
    },
    cart: [],
    orders: []
});

module.exports =  User;