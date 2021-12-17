const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const EditorialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    CreationDate: {
        type: Date,
        required: true,
    },
    authors: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }],
    books: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'book'
    }]
})
const EditorialModel = new mongoose.model("editorial", EditorialSchema);

module.exports = EditorialModel;