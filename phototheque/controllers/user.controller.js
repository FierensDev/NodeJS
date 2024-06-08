const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const signUp = async (req,res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      console.log(`hashed : `, hash)
      User.create({
        email: req.body.email,
        password: hash
      })
      res.send({
        email: req.body.email,
        password: hash
      })
    })
}

const signIn = async (req,res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if(isPasswordValid){
            return res.json({message: "Utilisateur connecté", data: user })
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

module.exports = {
  signUp,
  getUserById,
  updateUser,
  deleteUser,
  signIn
}