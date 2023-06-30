const UserModel = require("../models/user.model.js")
const bcrypt = require('bcryptjs')
const createAccessToken = require("../libs/jwt.js");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require('../config.js')
const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userFound = await userModel.findOne({ email })
        if (!userFound) return res.status(400).json(["User not found"])


        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json(["incorrect password"])

        const token = await createAccessToken({ id: userFound._id })
        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createAt: userFound.createdAt,
            updateAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json(["User not found"])
    };
};


const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userFound = await userModel.findOne({ email })
        if (userFound) return res.status(400).json(["The email already exist"])

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await new UserModel({
            "email": email || undefined,
            "password": passwordHash || undefined,
            "username": username || undefined,
        })
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id })
        res.cookie("token", token);

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200)
}

const profile = async (req, res) => {
    const userFound = await userModel.findById(req.user.id)
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createAt: userFound.createdAt,
        updateAt: userFound.updatedAt,
    })
}

const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: "Unautgorized" });
    }

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {

        if (err) return res.status(401).json({ message: "Unautgorized" });

        const userFound = await UserModel.findById(user.id)

        if (!userFound) return res.status(401).json({ message: "Unautgorized" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    })
}

module.exports = { register, login, logout, profile, verifyToken }


