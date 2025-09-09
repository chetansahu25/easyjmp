const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, "User ID must be at least 3 characters long"],
            maxlength: [20, "User ID cannot exceed 20 characters long"],
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//function to hash password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
