const router = require("express").Router()
const User = require("../../models/user")
const Refresh = require("../../models/refreshTokens")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authenticate = require("../middleware/auth")
const loginValidation = require("../validation/loginValidation")
const registerValidation = require("../validation/registerValidation")

require("dotenv").config()

router.get("/getUser", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    res.send(err)
  }
})

router.post("/register", async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body)
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
        path: error.details[0].path[0]
      })

    const userExists = await User.findOne({ email: req.body.email })
    if (userExists)
      return res
        .status(400)
        .json({ message: "Email already exists", path: "email" })

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })

    await user.save()
    res.json({ message: "Sign up successfull!" })
  } catch (err) {
    res.send(err)
  }
})

router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body)
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
        path: error.details[0].path[0]
      })

    const user = await User.findOne({ email: req.body.email })
    const password = bcrypt.compareSync(req.body.password, user.password)

    if (!user)
      return res.status(400).json({ message: "wrong email", path: "email" })
    if (!password)
      return res
        .status(400)
        .json({ message: "wrong password!", path: "password" })

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m"
    })

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET)
    const token = new Refresh({ refresh_tokens: refreshToken })
    await token.save()
    res.json({ accessToken, refreshToken })
  } catch (err) {
    res.send(err)
  }
})

router.post("/token", async (req, res) => {
  const { token } = req.body
  const refresh = await Refresh.find()
  const refreshTokens = refresh.map(rt => rt.refresh_tokens)

  if (!token) return res.sendStatus(401)

  if (!refreshTokens.includes(token)) return res.sendStatus(403)

  jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "10m"
    })

    res.json({ accessToken })
  })
})

router.post("/logout", async (req, res) => {
  try {
    const { token } = req.body
    await Refresh.findOneAndDelete({ refresh_tokens: token })

    res.json({ message: "Logout successful" })
  } catch (err) {
    res.send(err)
  }
})

module.exports = router
