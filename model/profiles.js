const mongoose = require('mongoose');

const schema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    UserName: {
        type: String,
        default: null,
    },
    UserAge: {
        type: String,
        default: 13,
    },
    UserHobby: {
        type: String,
        default: null,
    },
    CustomId: {
        type: String,
        default: null,
    },

})

module.exports = mongoose.model('profile', schema)