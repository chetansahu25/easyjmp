const mongoose = require("mongoose");

const ClickSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShortUrl",
    required: true, 
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },

  // IP & Geo info
  ip: String,
  country: String,
  region: String,
  city: String,
  latitude: Number,
  longitude: Number,

  // Device & Browser info
  deviceType: String, // "Desktop" | "Mobile" | "Tablet"
  os: String,         // "Windows", "macOS", "Android", "iOS", etc.
  browser: String,    // "Chrome", "Firefox", "Safari", etc.
  browserVersion: String,

  // Traffic source
  referrer: String,   // e.g., google.com, facebook.com
  utmSource: String,  // extracted from query params
  utmMedium: String,
  utmCampaign: String,
  utmTerm: String,
  utmContent: String,

  // Bot detection
  isBot: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Click", ClickSchema);
