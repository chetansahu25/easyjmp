const cookieOptions = {
    httpOnly: true,        
  secure: true,          // cookie only sent over HTTPS (use false for localhost HTTP)
  sameSite: "None",      // allow cross-site cookies
  domain: "https://easyjmp.onrender.com", 
  path: "/",
    
};

module.exports = cookieOptions;
