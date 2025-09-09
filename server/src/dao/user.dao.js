const User = require('../models/user.model');

//create User Function
async function createUser({ name, userId, email, password }) {
    const newUser = await User.create({ name, userId, email, password });

    return newUser;
}



//find User Function
async function findUserByEmail(email) {
    const user = await User.findOne({ email }).lean();
    return user;
}

//update user function
async function updateUser(id, { name, email, password }) {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    return updatedUser;
}

module.exports = { createUser, findUserByEmail, updateUser };