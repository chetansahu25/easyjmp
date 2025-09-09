const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({

    originalUrl: {
        type: String,
        required: true
    },

    shortUrl: {
        type: String,
        required: true,
        index: true,
        unique: true
    },

    clickCount: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);
module.exports = ShortUrl;