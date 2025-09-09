
const shortUrlSchema = require("../models/shorturl.model");
const { nanoid } = require('nanoid');

async function createShortUrlService(url, userId, slug=null) {
    const shortUrl = slug || nanoid(10);
    console.log(userId)
    const newUrl = new shortUrlSchema({
      originalUrl: url,
      shortUrl: shortUrl,
      user: userId ? userId : null
    });
    await newUrl.save();

      return newUrl.shortUrl;

};

module.exports = { createShortUrlService };