

const mongoose = require('mongoose');
const configsDatabase = require('./../configs/database');

// Category Schema
const modelSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
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

module.exports = mongoose.model(configsDatabase.COLLECTION_CATEGORY, modelSchema);