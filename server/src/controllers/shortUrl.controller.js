const { createShortUrlService }= require('../services/createShortUrlService');
const {getUrlsService, getAllUrlService} = require('../services/getUrl.service');

const handleCreateShortUrl = async (req, res) => {
    const { url, slug } = req.body;
    const userId = req.userId;
    const shortUrl = await createShortUrlService(url, userId, slug);
    res.send(process.env.APP_URL + shortUrl);
}

const handleGetUrls = async (req, res) => {    
    const userId = req.userId;    
    console.log(userId);
    
    const urls = await getUrlsService(userId);
    console.log("we have reached here")
    res.json(urls);
}

const handleGetAllUrls = async (req, res) => {
    const userId = req.userId
    const { search, page, limit } = req.query;
    console.log(search)

    try {
        const allUrls = await getAllUrlService(userId, search, page, limit)
        res.status(201).json(allUrls)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
        
    }
    
}

module.exports = { handleCreateShortUrl, handleGetUrls, handleGetAllUrls };