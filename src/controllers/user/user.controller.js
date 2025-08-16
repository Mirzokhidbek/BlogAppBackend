class UserController {
  static signUp = (req, res) => {
    const { name, email, password } = req.body;
    res.status(201).json({ message: "User registered successfully!" });
  };
}
