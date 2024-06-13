const Board = require('../models/Board')
const User = require('../models/User')
const mongoose = require('mongoose')

const createBoard = async(req, res) => {
  console.log(`deunsLog : `, req.body)
  try{
    Board.create({
      name: req.body.name,
      created_by: "6664668cb55e5e0281123453",
      shared_to: req.body.shared_to,
      image_link:  req.body.image_link
    })

    res.status(201).json({message: "Création du tableau"})
  } catch(err) {
    res.status(500).json({message: "Erreur lors de la création d'un tableau"})
  }
  res.send('ok')
}

const getBoardById = async (req, res) => {
  try{
    if(!mongoose.isValidObjectId(req.params.id)){
      return res.status(404).send('ID invalid');
    }

    const board = await Board.findById(req.params.id).exec();

    if(board){
      res.send(board)
    } else {
      res.status(404).send("Board not find")
    }
  } catch(err) {
    res.status(500).send("Server error");
  }
}

const addImages = async (req,res) => {

 try {
    const updateResult = await Board.updateOne(
      { _id: req.body.boardId },
      { $push: { image_link: { $each: req.body.tabImages } } }
    );

    if (updateResult.nModified === 0) {
      return res.status(404).json({ message: "Board not found or images not added" });
    }

    res.status(200).json({ message: "Images added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la modification du tableau", error: err });
  }
}

const addUsers = async(req, res) => {
  try {
    const updateBoard = await Board.updateOne(
      { _id : req.body.boardId },
      { $push: { shared_to: {$each: req.body.tabUsers}}}
    );

    if(updateBoard.nModified === 0){
      return res.status(404).json({message: "Tableau introuvable ou utilisateur non ajouté"})
    }

    res.status(200).json({message: "Ajout de l'utilisateur au tableau"});
  } catch(err) {
    res.status(500).json({message : "Erreur lors de l'ajout d'un utilisateur au tableau", error: err})
  }
}

const deleteBoard = async (req,res) => {
  try {
    const board= await Board.findByIdAndDelete(req.params.id)

    if(board) {
      res.send(board);
    } else {
      res.status(404).json({message: "board not find"})
    }
  } catch(err){
    res.status(500).json({message: "Server error"})
  }
}

module.exports = {
  createBoard,
  getBoardById,
  addImages,
  addUsers,
  deleteBoard
}