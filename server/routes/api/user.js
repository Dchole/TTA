const router = require("express").Router()
const User = require("../../models/user")
const Refresh = require("../../models/refreshTokens")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authenticate = require("../middleware/auth")

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
  const userExists = await User.findOne({ email: req.body.email })
  if (userExists)
    return res.json({ message: "Email already exists", path: "email" })

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(req.body.password, salt)

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  })

  try {
    await user.save()
    res.json({ message: "Sign up successfull!" })
  } catch (err) {
    res.send(err)
  }
})

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    const password = bcrypt.compareSync(req.body.password, user.password)

    if (!user) return res.json({ message: "wrong email", path: "email" })
    if (!password)
      return res.json({ message: "wrong password!", path: "password" })

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
    if (err) {
      return res.sendStatus(403)
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "20m"
    })

    res.json({
      accessToken
    })
  })
})

router.get("/logout", async (req, res) => {
  await Refresh.deleteMany()

  res.send("Logout successful")
})

module.exports = router
