const cookieOptions = {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'Lax',
    
};

module.exports = cookieOptions;
