const cookieOptions = {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    sameSite: 'Lax',
    
};

module.exports = cookieOptions;
