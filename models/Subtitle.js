var mongoose = require('mongoose');

var schema = mongoose.Schema({
    nome: { 
        type: String, 
        required: true
    }, 
    downloads: {
        required: true,
        type: Number,
    }, 
    likes: {
        required: true,
        type: Number        
    },
    unlikes: {
        required: true,
        type: Number        
    },
    sender: {
        required: true,
        type: String        
    },
    date: {
        required: true,
        type: String        
    },
    language: {
        required: true,
        type: String        
    },
    downloadLink: {
        required: true,
        type: String        
    }
});

module.exports = mongoose.model('Subtitle', schema);