const router = require("express").Router();
const { User, validate } = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // Check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });

    // Hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Save new user
    const newUser = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();

    // Generate token
    const token = newUser.generateAuthToken();

    // ✅ Return consistent response with login
    res.status(201).send({ data: token, message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
