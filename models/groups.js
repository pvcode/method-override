const mongoose = require('mongoose');
const configsDatabase = require('./../configs/database');

// Category Schema
const modelSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    content: {
        type: String,
        required: true
    },
    ordering: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model(configsDatabase.COLLECTION_GROUP, modelSchema);