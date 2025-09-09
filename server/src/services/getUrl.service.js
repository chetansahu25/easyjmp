const ShortUrl = require("../models/shorturl.model");

const getUrlsService = async (userId) => {
    //find all urls for a user and get latest 5 urls
    const urls = await ShortUrl.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5);
    return urls;
};

const getAllUrlService = async (userId, search, page, limit) => {
    const skip = (page - 1) * limit;
    console.log(search, page);


    function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

 const newSearch = escapeRegex(search)

    try {
        const allUrls = await ShortUrl.find({
            $and: [
                { user: userId },
                {
                    $or: [
                        { originalUrl: { $regex: String(newSearch), $options: "i" } },
                        { shortUrl: { $regex: String(newSearch), $options: "i" } },
                    ],
                },
            ],
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
        const total = await ShortUrl.countDocuments({
            $and: [
                { user: userId },
                {
                    $or: [
                        { originalUrl: { $regex: String(newSearch), $options: "i" } },
                        { shortUrl: { $regex: String(newSearch), $options: "i" } },
                    ],
                },
            ],
        });
        console.log(allUrls);
        return {
            total,
            page,
            totalPages: Math.ceil(total / limit),
            urls: allUrls,
        };
    } catch (error) {
        throw error;
    }
};

module.exports = { getUrlsService, getAllUrlService };
