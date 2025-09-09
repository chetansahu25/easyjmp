const shortUrlSchema = require('../models/shorturl.model'); 

async function handleClicks(req, res){
    const urlId = req.params.id;    
    const shortUrl = await shortUrlSchema.findOne({ shortUrl: urlId });
    if (!shortUrl) {
        return res.status(404).send('URL not found');
    }
    shortUrl.clickCount++;
    await shortUrl.save();
    res.redirect(302,shortUrl.originalUrl);
}

module.exports = { handleClicks };