const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
    try {
        const { name, email, phoneNumber, avatar } = req.body;

        let user = await User.findOne({ email });
        let newUser;

        if (!user) {
            newUser = new User({
                name,
                email,
                phoneNumber,
                avatar
            });
            await newUser.save();
            user = newUser;
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

        res.cookie("access_token", token, {
            httpOnly: true
        });

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
module.exports.getUser = async (req, res) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to access this route"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Send only necessary fields in response
        res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                phoneNumber: user.phoneNumber || "N/A",
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


module.exports.logout = (req, res) => {
    try {
        // Clear the access token cookie
        res.clearCookie('access_token', { httpOnly: true });

        // Send a response indicating the user is logged out
        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to logout',
        });
    }
};


