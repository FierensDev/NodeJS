const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req,res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      console.log(`hashed : `, hash)
      User.create({
        email: req.body.email,
        password: hash,
        last_name: req.body.last_name,
        first_name: req.body.first_name
      })
      res.send({
        email: req.body.email,
        password: hash,
        last_name: req.body.last_name,
        first_name: req.body.first_name
      })
    })
}

const signIn = async (req,res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if(isPasswordValid){

            //JWT
            const token = jwt.sign(
              {userId: user.id},
              "private_key",
              {expiresIn: '24h'}
            )

            return res.json({message: "Utilisateur connecté", data: user, token })
          } else {
            return res.status(401).json({message: "Mot de passe incorrect"})
          }
        })
    })
    .catch(err => {
      return res.status(404).json({message: "Aucun compte trouvé avec cet email"})
    })

  //retourner le token 
}

const getUserById = async (req,res) => {
  try {
    if(!mongoose.isValidObjectId(req.params.id)){
      return res.status(404).send('ID invalid');
    }

    const user = await User.findById(req.params.id).exec();

    if(user){
      res.send(user);
    } else {
      res.status(404).send("User not find");
    }
  } catch(err) {
    res.status(500).send("Server error");
  }
}

const updateUser = async (req,res) => {
  console.log('req.body', req.body)
  console.log(`params : `, req.params)
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true})
    if(user){
      res.send(user);
    } else {
      res.Status(404).send("User not find")
    }
  } catch (err){
    res.status(500).send("Server error");
  }
}

const deleteUser = async (req,res) => {
  console.log(`params : `, req.params)

  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if(user){
      res.send(user);
    } else {
      res.Status(404).send("User not find")
    }
  } catch (err){
    res.status(500).send("Server error");
  }
}

const getByFirstnameAndLastName = async (req, res)=> {
  try {
    const { query } = req.params;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const regex = new RegExp(query, 'i'); // 'i' pour rendre la recherche insensible à la casse

    const users = await User.find({
      $or: [
        { first_name: { $regex: regex } },
        { last_name: { $regex: regex } }
      ]
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

module.exports = {
  signUp,
  getUserById,
  updateUser,
  deleteUser,
  signIn,
  getByFirstnameAndLastName
}