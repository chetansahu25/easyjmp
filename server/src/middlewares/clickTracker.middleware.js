const Click = require("../models/Click"); 
const ShortUrl = require("../models/Url");  
const UAParser = require("ua-parser-js"); 

async function clickTracker(req, res, next) {
  try {
    const shortUrl = req.params.id;
    const urlData = await ShortUrl.findOne({ shortUrl });

    if (!urlData) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Extract IP
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress;

      //ip lookup can be added here for geo info
      fetch(`https://ip-api.com/json/${ip}`)
        .then((response) => response.json())
        .then((data) => {
          // Map the geo info to the click object
          clickData = {
            ...clickData,
            isp: data.isp,
            country: data.countryName,
            region: data.regionName,
            city: data.city,
            latitude: data.lat,
            longitude: data.lon,
          };
        })
        .catch((error) => {
          console.error("Error fetching IP info:", error);
        });

    //  Parse User-Agent
    const ua = UAParser(req.headers["user-agent"] || "");
    const deviceType = ua.device.type || "Desktop";
    const os = ua.os.name || "Unknown";
    const browser = ua.browser.name || "Unknown";
    const browserVersion = ua.browser.version || "Unknown";

    //Referrer
    const referrer = req.headers["referer"] || "Direct";

    // UTM Parameters 
    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } =
      req.query;

    // Save Click 
    await Click.create({
      urlId: urlData._id,
      ip,
      deviceType,
      os,
      browser,
      browserVersion,
      referrer,
      utmSource: utm_source,
      utmMedium: utm_medium,
      utmCampaign: utm_campaign,
      utmTerm: utm_term,
      utmContent: utm_content,
    });

    //Increment Click Count
    urlDoc.clicksCount += 1;
    await urlDoc.save();

    // Redirect user to original URL
    return res.redirect(urlDoc.originalUrl);
  } catch (err) {
    console.error("Error tracking click:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = clickTracker;
