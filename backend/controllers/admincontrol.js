const Admin = require("../models/admindata");
const jwt = require("jsonwebtoken");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const Adminregister = async (req, res) => {
    const { name, password } =
      req.body;
  
    try {
      const admin = await Admin.create({
        name,
        password,
      });
      res.status(200).json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  const Adminlogin = (req, res) => {
    const { name, password } = req.body;
    Admin.findOne({ name: name }, (err, admin) => {
      if (admin) {
        const token = jwt.sign(
          {
            name: admin.name,
          },
          "secret12345"
        );
  
        if (password === admin.password) {
          res.send({ message: "Login successful", admin: token });
        } else {
          res.send({ message: "password didn't match" });
        }
      } else {
        res.send({ message: "Admin not registered" });
      }
    });
  };
  
  module.exports = {Adminregister, Adminlogin};
